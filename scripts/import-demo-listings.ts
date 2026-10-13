/**
 * Bulk import jobs from the demo CSV at the project root.
 *
 * Requires DATABASE_URL in .env (see .env.example).
 *
 * Usage:
 *   npm run import:demo-listings
 *   npm run import:demo-listings -- --limit=50
 *   npm run import:demo-listings -- --truncate --limit=100
 *   npm run import:demo-listings -- --file="path/to/file.csv"
 *   npm run import:demo-listings -- --no-application-control
 *
 * Full import (~137k rows) can take a long time; use a stable network connection.
 * Appends by default; --truncate deletes all Job rows first (cascades applications).
 */

import { createReadStream, appendFileSync } from 'fs';
import path from 'path';
import { randomInt } from 'crypto';
import { parse } from 'csv-parse';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { generateSlug } from '../src/lib/slug';
import { generateJobId } from '../src/lib/jobId';

const DEFAULT_CSV = 'Healthcare_Demo_Listings_India.xlsx - Demo Listings.csv';
const BATCH_SIZE = 500;
const DATE_RANGE_DAYS = 90;
const MIN_DESCRIPTION_LENGTH = 50;
const ERROR_LOG = path.join(process.cwd(), 'import-errors.log');

type CsvRow = {
  Title?: string;
  Profession?: string;
  Location?: string;
  Description?: string;
  Company?: string;
  Category?: string;
};

type JobCreateRow = {
  jobId: string;
  title: string;
  slug: string;
  profession: string;
  location: string;
  description: string;
  applyLink: string;
  company: string;
  category: string;
  postedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isApplicationControl: boolean;
};

function parseCliArgs() {
  const args = process.argv.slice(2);
  let file = path.join(process.cwd(), DEFAULT_CSV);
  let limit: number | undefined;
  let truncate = false;
  let isApplicationControl = true;

  for (const arg of args) {
    if (arg === '--truncate') truncate = true;
    else if (arg === '--application-control') isApplicationControl = true;
    else if (arg === '--no-application-control') isApplicationControl = false;
    else if (arg.startsWith('--file=')) {
      file = path.isAbsolute(arg.slice(7))
        ? arg.slice(7)
        : path.join(process.cwd(), arg.slice(7));
    } else if (arg.startsWith('--limit=')) {
      const n = Number.parseInt(arg.slice(8), 10);
      if (Number.isFinite(n) && n > 0) limit = n;
    }
  }

  return { file, limit, truncate, isApplicationControl };
}

function buildJobId(profession: string, location: string, rowIndex: number): string {
  const base = generateJobId(profession, location);
  return `${base}-${String(rowIndex).padStart(6, '0')}`;
}

/** Random posted time in the last 90 days; createdAt a few minutes earlier on the same day. */
function randomPostedAndCreated(): {
  postedDate: Date;
  createdAt: Date;
  updatedAt: Date;
} {
  const daysAgo = randomInt(0, DATE_RANGE_DAYS);
  const postedDate = new Date();
  postedDate.setDate(postedDate.getDate() - daysAgo);
  postedDate.setHours(randomInt(8, 19), randomInt(0, 59), randomInt(0, 59), 0);

  const createdAt = new Date(
    postedDate.getTime() - randomInt(0, 45) * 60 * 1000
  );

  return { postedDate, createdAt, updatedAt: createdAt };
}

function logSkip(rowIndex: number, reason: string) {
  const line = `row ${rowIndex}: ${reason}\n`;
  appendFileSync(ERROR_LOG, line, { encoding: 'utf8' });
}

function rowToJob(
  row: CsvRow,
  rowIndex: number,
  isApplicationControl: boolean
): JobCreateRow | null {
  const title = row.Title?.trim() ?? '';
  const profession = row.Profession?.trim() ?? '';
  const locationRaw = row.Location?.trim() ?? '';
  const description = row.Description?.trim() ?? '';
  const company = row.Company?.trim() ?? '';
  const category = row.Category?.trim() ?? '';

  if (!title || !profession || !locationRaw || !description || !company || !category) {
    logSkip(rowIndex, 'missing required column');
    return null;
  }

  if (description.length < MIN_DESCRIPTION_LENGTH) {
    logSkip(rowIndex, `description shorter than ${MIN_DESCRIPTION_LENGTH} characters`);
    return null;
  }

  const location = locationRaw.toLowerCase();
  const slug = generateSlug(profession, location).slice(0, 255);
  const jobId = buildJobId(profession, location, rowIndex);
  const applyLink = `https://careers.example.com/apply/${jobId.toLowerCase()}`;
  const dates = randomPostedAndCreated();

  return {
    jobId,
    title,
    slug,
    profession,
    location,
    description,
    applyLink,
    company,
    category,
    postedDate: dates.postedDate,
    createdAt: dates.createdAt,
    updatedAt: dates.updatedAt,
    isApplicationControl,
  };
}

async function main() {
  const { file, limit, truncate, isApplicationControl } = parseCliArgs();

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set.');
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  console.log(`CSV file: ${file}`);
  console.log(`Batch size: ${BATCH_SIZE}`);
  console.log(`isApplicationControl: ${isApplicationControl}`);
  if (limit) console.log(`Limit: ${limit} rows`);
  if (truncate) console.warn('WARNING: --truncate will delete ALL jobs (and applications).');

  if (truncate) {
    const deleted = await prisma.job.deleteMany();
    console.log(`Deleted ${deleted.count} existing job(s).`);
  }

  let rowIndex = 0;
  let imported = 0;
  let skipped = 0;
  let batch: JobCreateRow[] = [];
  const startedAt = Date.now();

  const flush = async () => {
    if (batch.length === 0) return;
    const result = await prisma.job.createMany({
      data: batch,
      skipDuplicates: true,
    });
    imported += result.count;
    batch = [];
  };

  const parser = createReadStream(file, { encoding: 'utf8' }).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      relax_column_count: true,
    })
  );

  for await (const record of parser) {
    rowIndex++;

    if (limit !== undefined && rowIndex > limit) break;

    const job = rowToJob(record as CsvRow, rowIndex, isApplicationControl);
    if (!job) {
      skipped++;
      continue;
    }

    batch.push(job);

    if (batch.length >= BATCH_SIZE) {
      await flush();
      if (rowIndex % 5000 === 0) {
        const elapsed = (Date.now() - startedAt) / 1000;
        console.log(
          `Processed ${rowIndex} CSV rows — imported ~${imported}, skipped ${skipped} (${(rowIndex / elapsed).toFixed(0)} rows/s)`
        );
      }
    }
  }

  await flush();

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log('\nImport finished.');
  console.log(`CSV rows read: ${rowIndex}`);
  console.log(`Inserted: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Elapsed: ${elapsed}s`);
  if (skipped > 0) {
    console.log(`Skip details: ${ERROR_LOG}`);
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
