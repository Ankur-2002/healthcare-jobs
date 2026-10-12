import { NextResponse } from 'next/server';
import { refreshStaleJobs, shouldRunCronTick } from '@/lib/jobRefresh';

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret');
  return querySecret === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const force = url.searchParams.get('force') === 'true';

  if (!force && !shouldRunCronTick()) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: 'random_skip',
    });
  }

  try {
    const result = await refreshStaleJobs();
    return NextResponse.json({ ok: true, skipped: false, ...result });
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
