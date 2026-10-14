import { randomInt } from 'crypto';
import prisma from '@/lib/prisma';
import { generateJobId } from '@/lib/jobId';

const MIN_AGE_DAYS = 20;
const DEFAULT_MAX_AGE_DAYS = 40;
const CANDIDATE_POOL_SIZE = 40;

export type JobRefreshResult = {
  refreshRunId: string;
  minAgeDays: number;
  maxAgeDays: number;
  requestedCount: number;
  processed: number;
  refreshed: Array<{
    originalJobId: string;
    replacementJobId: string;
    title: string;
    postedDate: string;
  }>;
  skippedReason?: string;
};

function getMaxAgeDays(): number {
  const raw = process.env.JOB_REFRESH_MAX_AGE_DAYS;
  const parsed = raw ? Number.parseInt(raw, 10) : DEFAULT_MAX_AGE_DAYS;
  if (!Number.isFinite(parsed) || parsed < MIN_AGE_DAYS) {
    return DEFAULT_MAX_AGE_DAYS;
  }
  return parsed;
}

function shuffleInPlace<T>(items: T[]): void {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
}

function sleepMs(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uniqueJobId(
  profession: string,
  location: string,
  attempt = 0
): Promise<string> {
  const jobId = generateJobId(profession, location);
  const exists = await prisma.job.findUnique({
    where: { jobId },
    select: { jobId: true },
  });
  if (!exists) return jobId;
  if (attempt >= 5) {
    return `${jobId}-${randomInt(1000, 9999)}`;
  }
  await sleepMs(2);
  return uniqueJobId(profession, location, attempt + 1);
}

/**
 * Archive → delete → recreate 1–3 random eligible jobs with new jobId,
 * fresh createdAt (default) and postedDate at run time.
 */
export async function refreshStaleJobs(): Promise<JobRefreshResult> {
  const maxAgeDays = getMaxAgeDays();
  const minAgeDays = randomInt(MIN_AGE_DAYS, maxAgeDays + 1);
  const requestedCount = randomInt(1, 4);
  const refreshRunId = `refresh-${Date.now()}-${randomInt(10000, 99999)}`;
  const postedAt = new Date();

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - minAgeDays);

  const candidates = await prisma.job.findMany({
    where: {
      isApplicationControl: true,
      createdAt: { lte: cutoff },
    },
    orderBy: { createdAt: 'asc' },
    take: CANDIDATE_POOL_SIZE,
  });

  if (candidates.length === 0) {
    return {
      refreshRunId,
      minAgeDays,
      maxAgeDays,
      requestedCount,
      processed: 0,
      refreshed: [],
      skippedReason: `No jobs with isApplicationControl=true and createdAt older than ${minAgeDays} days`,
    };
  }

  shuffleInPlace(candidates);
  const selected = candidates.slice(0, requestedCount);
  const refreshed: JobRefreshResult['refreshed'] = [];

  for (const job of selected) {
    const replacementJobId = await uniqueJobId(job.profession, job.location);

    await prisma.$transaction(async tx => {
      await tx.pastJob.create({
        data: {
          originalJobId: job.jobId,
          replacementJobId,
          title: job.title,
          slug: job.slug,
          profession: job.profession,
          location: job.location,
          description: job.description,
          applyLink: job.applyLink,
          company: job.company,
          category: job.category,
          postedDate: job.postedDate,
          originalCreatedAt: job.createdAt,
          originalUpdatedAt: job.updatedAt,
          refreshRunId,
        },
      });

      await tx.job.delete({ where: { id: job.id } });

      await tx.job.create({
        data: {
          jobId: replacementJobId,
          title: job.title,
          slug: job.slug,
          profession: job.profession,
          location: job.location,
          description: job.description,
          applyLink: job.applyLink,
          company: job.company,
          category: job.category,
          postedDate: postedAt,
          isApplicationControl: job.isApplicationControl,
        },
      });
    });

    refreshed.push({
      originalJobId: job.jobId,
      replacementJobId,
      title: job.title,
      postedDate: postedAt.toISOString(),
    });

    await sleepMs(randomInt(5, 25));
  }

  return {
    refreshRunId,
    minAgeDays,
    maxAgeDays,
    requestedCount,
    processed: refreshed.length,
    refreshed,
  };
}
