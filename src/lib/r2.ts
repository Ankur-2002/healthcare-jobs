import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error('R2 environment variables are not configured');
  }

  return { accountId, accessKeyId, secretAccessKey, bucketName };
}

function getR2Client(): S3Client {
  const { accountId, accessKeyId, secretAccessKey } = getR2Config();

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);

function sanitizeExtension(originalName: string): string {
  const match = originalName.match(/(\.[a-zA-Z0-9]+)$/);
  const ext = match ? match[1].toLowerCase() : '.pdf';
  return ALLOWED_EXTENSIONS.has(ext) ? ext : '.pdf';
}

export function buildResumeObjectKey(
  jobId: string,
  applicantKey: string,
  originalName: string
): string {
  const safeJobId = jobId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeApplicant = applicantKey.replace(/[^a-zA-Z0-9-]/g, '_');
  const ext = sanitizeExtension(originalName);
  return `applications/${safeJobId}/${safeApplicant}/${randomUUID()}${ext}`;
}

export function buildResumePublicUrl(objectKey: string): string {
  const base = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, '');
  if (!base) {
    throw new Error('R2_PUBLIC_BASE_URL is not configured');
  }
  return `${base}/${objectKey}`;
}

export async function uploadResume(
  objectKey: string,
  body: Buffer,
  contentType: string
): Promise<void> {
  const { bucketName } = getR2Config();
  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: body,
      ContentType: contentType,
    })
  );
}
