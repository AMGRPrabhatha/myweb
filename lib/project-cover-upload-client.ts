import { createClient } from '@supabase/supabase-js';

const maxBytes = 10 * 1024 * 1024;
const allowed = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']);

async function hasImageSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  const ascii = (start: number, end: number) => String.fromCharCode(...Array.from(bytes.slice(start, end)));
  switch (file.type) {
    case 'image/png': return bytes[0] === 0x89 && ascii(1, 4) === 'PNG';
    case 'image/jpeg': return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case 'image/webp': return ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP';
    case 'image/gif': return ascii(0, 6) === 'GIF87a' || ascii(0, 6) === 'GIF89a';
    case 'image/avif': return ascii(4, 8) === 'ftyp' && /avif|avis/.test(ascii(8, 64));
    default: return false;
  }
}

async function jsonResponse(response: Response): Promise<{ error?: string; path?: string; token?: string; url?: string }> {
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => null) : null;
  if (!response.ok || !data) {
    if (data?.error) throw new Error(data.error);
    if (response.status === 413) throw new Error('The image is too large for this upload. Choose an image under 10 MB.');
    throw new Error(`Image upload could not be completed (HTTP ${response.status}). Please try again.`);
  }
  return data;
}

export async function uploadProjectCover(file: File): Promise<{ path: string; url: string }> {
  if (!allowed.has(file.type) || file.size < 1 || file.size > maxBytes) {
    throw new Error('Choose a PNG, JPEG, WebP, GIF, or AVIF image under 10 MB.');
  }
  if (!(await hasImageSignature(file))) throw new Error('The selected file does not match a supported image format.');
  const response = await fetch('/api/upload-cover', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: file.type, size: file.size }),
  });
  const signed = await jsonResponse(response);
  if (!signed.path || !signed.token || !signed.url) throw new Error('The image upload could not be prepared.');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) throw new Error('Image storage is not configured.');
  const client = createClient(supabaseUrl, anonKey);
  const { error } = await client.storage.from('project-covers').uploadToSignedUrl(signed.path, signed.token, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error('The image could not be uploaded to storage. Please try again.');
  return { path: signed.path, url: signed.url };
}

export async function cleanupProjectCover(path: string): Promise<void> {
  try {
    await fetch('/api/upload-cover', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
  } catch {
    // Storage cleanup is best effort. The saved project is never removed here.
  }
}
