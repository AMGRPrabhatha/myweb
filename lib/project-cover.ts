import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export async function saveProjectCover(entry: FormDataEntryValue | null): Promise<string | null> {
  if (!entry || typeof entry === 'string' || entry.size === 0) return null;
  if (entry.size > MAX_IMAGE_BYTES) throw new Error('Cover image must be 10 MB or smaller.');

  const bytes = Buffer.from(await entry.arrayBuffer());
  let extension: string | null = null;
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) extension = 'png';
  else if (bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) extension = 'jpg';
  else if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') extension = 'webp';
  else if (bytes.toString('ascii', 0, 4) === 'GIF8') extension = 'gif';
  else if (bytes.toString('ascii', 4, 8) === 'ftyp' && bytes.toString('ascii', 8, 12).startsWith('avif')) extension = 'avif';
  if (!extension) throw new Error('Choose a PNG, JPEG, WebP, GIF, or AVIF image.');

  const filename = `project-${crypto.randomUUID()}.${extension}`;
  const directory = join(process.cwd(), 'public', 'images', 'projects');
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, filename), bytes, { flag: 'wx' });
  return `/images/projects/${filename}`;
}
