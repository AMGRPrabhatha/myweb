import { createClient } from '@supabase/supabase-js';

const maxBytes = 10 * 1024 * 1024;
const acceptedTypes = new Set(['image/png', 'image/jpeg', 'image/webp']);

async function validSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const text = (start: number, end: number) => String.fromCharCode(...Array.from(bytes.slice(start, end)));
  if (file.type === 'image/png') return bytes[0] === 0x89 && text(1, 4) === 'PNG';
  if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === 'image/webp') return text(0, 4) === 'RIFF' && text(8, 12) === 'WEBP';
  return false;
}

async function parseResponse(response: Response): Promise<{ error?: string; path?: string; token?: string; url?: string }> {
  const json = response.headers.get('content-type')?.includes('application/json')
    ? await response.json().catch(() => null)
    : null;
  if (!response.ok || !json) {
    if (json?.error) throw new Error(json.error);
    if (response.status === 413) throw new Error('The image is too large. Choose one under 10 MB.');
    throw new Error(`Image upload failed (HTTP ${response.status}). Please try again.`);
  }
  return json;
}

export async function uploadTestimonialImage(file: File): Promise<{ path: string; url: string }> {
  if (!acceptedTypes.has(file.type) || file.size < 1 || file.size > maxBytes) {
    throw new Error('Choose a PNG, JPEG, or WebP image under 10 MB.');
  }
  if (!(await validSignature(file))) throw new Error('The selected file does not match a supported image format.');
  const response = await fetch('/api/upload-testimonial-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: file.type, size: file.size }),
  });
  const signed = await parseResponse(response);
  if (!signed.path || !signed.token || !signed.url) throw new Error('Image upload could not be prepared.');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error('Image storage is not configured.');
  const client = createClient(url, anonKey);
  const { error } = await client.storage.from('testimonial-images').uploadToSignedUrl(signed.path, signed.token, file, {
    contentType: file.type,
  });
  if (error) throw new Error('Could not upload this image to Supabase Storage. Please try again.');
  return { path: signed.path, url: signed.url };
}

export function testimonialImagePath(url: string): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const prefix = `${base.replace(/\/$/, '')}/storage/v1/object/public/testimonial-images/`;
  if (!url.startsWith(prefix)) return null;
  try {
    return decodeURIComponent(url.slice(prefix.length));
  } catch {
    return null;
  }
}

export async function cleanupTestimonialImage(path: string): Promise<void> {
  try {
    await fetch('/api/upload-testimonial-image', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
  } catch {
    // Cleanup is best effort; saved testimonials are protected by the API.
  }
}
