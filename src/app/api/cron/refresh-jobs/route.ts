import { NextResponse } from 'next/server';
import { refreshStaleJobs } from '@/lib/jobRefresh';
import { getJobRefreshScheduleDecision } from '@/lib/jobRefreshSchedule';

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret');
  return querySecret === secret;
}

/**
 * Job refresh endpoint — invoke from your own server (curl/cron), not Vercel Cron.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const schedule = getJobRefreshScheduleDecision();
    if (!schedule.run) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: 'Outside randomized daily refresh window',
        schedule,
      });
    }

    const result = await refreshStaleJobs();
    return NextResponse.json({ ok: true, skipped: false, schedule, ...result });
  } catch (err) {
    console.error('Job refresh cron failed:', err);
    return NextResponse.json(
      { error: 'Job refresh failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
