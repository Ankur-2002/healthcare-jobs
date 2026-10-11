const APPLICANT_KEY_STORAGE = 'hjp_applicant_key';
const APPLIED_JOBS_STORAGE = 'hjp_applied_job_ids';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function getOrCreateApplicantKey(): string {
  if (!canUseStorage()) {
    throw new Error('localStorage is not available');
  }

  const existing = localStorage.getItem(APPLICANT_KEY_STORAGE);
  if (existing) {
    return existing;
  }

  const key = crypto.randomUUID();
  localStorage.setItem(APPLICANT_KEY_STORAGE, key);
  return key;
}

function readAppliedJobIds(): string[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(APPLIED_JOBS_STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function isJobAppliedInCache(jobId: string): boolean {
  return readAppliedJobIds().includes(jobId);
}

export function markJobAppliedInCache(jobId: string): void {
  if (!canUseStorage()) return;
  const ids = new Set(readAppliedJobIds());
  ids.add(jobId);
  localStorage.setItem(APPLIED_JOBS_STORAGE, JSON.stringify([...ids]));
}

export async function fetchApplicationStatus(
  jobId: string,
  applicantKey: string
): Promise<{ applied: boolean; appliedAt?: string }> {
  const params = new URLSearchParams({ jobId, applicantKey });
  const res = await fetch(`/api/applications/status?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to check application status');
  }
  return res.json() as Promise<{ applied: boolean; appliedAt?: string }>;
}
