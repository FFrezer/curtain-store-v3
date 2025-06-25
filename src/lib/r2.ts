import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const client = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2({
  file,
  filename,
  contentType,
}: {
  file: Buffer | Readable;
  filename: string;
  contentType: string;
}) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: filename,
    Body: file,
    ContentType: contentType,
  });

  await client.send(command);

  return `${process.env.R2_PUBLIC_URL}/${filename}`;
}
