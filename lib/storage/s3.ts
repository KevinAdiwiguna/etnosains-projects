import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import crypto from 'crypto';
import path from 'path';

const endpoint = process.env.AWS_S3_ENDPOINT!;

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  ...(endpoint && { endpoint }),
  forcePathStyle: true,
  maxAttempts: 1,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';

const ALLOWED_MIME_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  gif: ['image/gif'],
  video: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/zip',
  ],
};

const ALL_ALLOWED_TYPES = Object.values(ALLOWED_MIME_TYPES).flat();

export interface UploadOptions {
  fileBuffer: Buffer;
  fileName: string;
  mimeType: string;
  folder?: string;
  customFileName?: string;
}

export interface UploadResult {
  relativePath: string;
  key: string;
  savedFileName: string;
}

export function isValidFileType(mimeType: string): boolean {
  return ALL_ALLOWED_TYPES.includes(mimeType);
}

export async function uploadToS3({
  fileBuffer,
  fileName,
  mimeType,
  folder = '',
  customFileName,
}: UploadOptions): Promise<UploadResult> {
  if (!isValidFileType(mimeType)) {
    throw new Error(`Tipe file '${mimeType}' tidak didukung.`);
  }

  if (!BUCKET_NAME) {
    throw new Error(
      'Variabel lingkungan AWS_S3_BUCKET_NAME belum dikonfigurasi.'
    );
  }

  const ext = path.extname(fileName).toLowerCase();

  const uniqueName = customFileName
    ? `${customFileName}${ext}`
    : `${crypto.randomUUID()}${ext}`;

  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');

  const objectKey = cleanFolder ? `${cleanFolder}/${uniqueName}` : uniqueName;

  const params: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: objectKey,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));

    const relativePath = `/${objectKey}`;

    return {
      relativePath,
      key: objectKey,
      savedFileName: uniqueName,
    };
  } catch (error) {
    console.error('[S3_UPLOAD_ERROR_DETAILS]', error);
    throw new Error('Gagal mengunggah file ke S3 Storage');
  }
}
