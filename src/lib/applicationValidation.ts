export const APPLICANT_KEY_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const ALLOWED_RESUME_CONTENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export function isValidApplicantKey(key: string): boolean {
  return APPLICANT_KEY_UUID_RE.test(key);
}

export function isAllowedResumeFile(file: File): boolean {
  return ALLOWED_RESUME_CONTENT_TYPES.has(file.type);
}
