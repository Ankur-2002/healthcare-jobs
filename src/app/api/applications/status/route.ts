import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isValidApplicantKey } from '@/lib/applicationValidation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId')?.trim();
  const applicantKey = searchParams.get('applicantKey')?.trim();

  if (!jobId || !applicantKey) {
    return NextResponse.json(
      { error: 'jobId and applicantKey are required' },
      { status: 400 }
    );
  }

  if (!isValidApplicantKey(applicantKey)) {
    return NextResponse.json({ error: 'Invalid applicantKey' }, { status: 400 });
  }

  const application = await prisma.jobApplication.findUnique({
    where: {
      applicantKey_jobId: { applicantKey, jobId },
    },
    select: { createdAt: true },
  });

  if (!application) {
    return NextResponse.json({ applied: false });
  }

  return NextResponse.json({
    applied: true,
    appliedAt: application.createdAt.toISOString(),
  });
}
