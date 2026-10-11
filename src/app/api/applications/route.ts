import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import {
  isAllowedResumeFile,
  isValidApplicantKey,
  RESUME_MAX_BYTES,
} from '@/lib/applicationValidation';
import {
  buildResumeObjectKey,
  buildResumePublicUrl,
  uploadResume,
} from '@/lib/r2';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobId = String(formData.get('jobId') ?? '').trim();
    const applicantKey = String(formData.get('applicantKey') ?? '').trim();
    const file = formData.get('file');

    if (!jobId || !applicantKey) {
      return NextResponse.json(
        { error: 'jobId and applicantKey are required' },
        { status: 400 }
      );
    }

    if (!isValidApplicantKey(applicantKey)) {
      return NextResponse.json({ error: 'Invalid applicantKey' }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
    }

    if (file.size > RESUME_MAX_BYTES) {
      return NextResponse.json(
        { error: 'Resume must be 5 MB or smaller' },
        { status: 400 }
      );
    }

    if (!isAllowedResumeFile(file)) {
      return NextResponse.json(
        { error: 'Resume must be a PDF or Word document' },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { jobId },
      select: { jobId: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const existing = await prisma.jobApplication.findUnique({
      where: {
        applicantKey_jobId: { applicantKey, jobId },
      },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ error: 'already_applied' }, { status: 409 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const objectKey = buildResumeObjectKey(jobId, applicantKey, file.name);
    const contentType = file.type;

    try {
      await uploadResume(objectKey, buffer, contentType);
    } catch (err) {
      console.error('R2 upload failed:', err);
      return NextResponse.json(
        { error: 'Failed to upload resume' },
        { status: 502 }
      );
    }

    const resumeUrl = buildResumePublicUrl(objectKey);

    const application = await prisma.jobApplication.create({
      data: {
        applicantKey,
        jobId,
        resumeObjectKey: objectKey,
        resumeUrl,
        fileName: file.name,
        contentType,
        sizeBytes: file.size,
      },
      select: { createdAt: true },
    });

    return NextResponse.json({
      ok: true,
      appliedAt: application.createdAt.toISOString(),
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return NextResponse.json({ error: 'already_applied' }, { status: 409 });
    }
    console.error('Application POST failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
