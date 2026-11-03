import { NextResponse } from 'next/server';
import { createAdminSessionClient, getAdminProfile } from '@/lib/admin-auth';

const bucket = 'testimonial-images';
const maxBytes = 10 * 1024 * 1024;
const extensions: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export async function POST(request: Request) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ error: 'Staff sign-in is required.' }, { status: 401 });
  try {
    const input = await request.json();
    const size = Number(input?.size);
    const type = String(input?.type ?? '');
    if (!extensions[type] || !Number.isSafeInteger(size) || size < 1 || size > maxBytes) {
      return NextResponse.json({ error: 'Choose a PNG, JPEG, or WebP image under 10 MB.' }, { status: 400 });
    }
    const client = createAdminSessionClient();
    if (!client) return NextResponse.json({ error: 'Image storage is not configured.' }, { status: 503 });
    const path = `incoming/${admin.user.id}/${crypto.randomUUID()}.${extensions[type]}`;
    const { data, error } = await client.storage.from(bucket).createSignedUploadUrl(path);
    if (error || !data?.token) {
      console.error('Testimonial image signing failed:', error?.name);
      return NextResponse.json({ error: 'Could not prepare image upload. Check the testimonial Storage bucket and admin permissions.' }, { status: 503 });
    }
    return NextResponse.json({ path, token: data.token, url: client.storage.from(bucket).getPublicUrl(path).data.publicUrl });
  } catch {
    return NextResponse.json({ error: 'Could not prepare image upload.' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ error: 'Staff sign-in is required.' }, { status: 401 });
  try {
    const { path } = await request.json();
    if (typeof path !== 'string' || !/^incoming\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.(png|jpg|webp)$/.test(path)) {
      return NextResponse.json({ error: 'Invalid testimonial image path.' }, { status: 400 });
    }
    const client = createAdminSessionClient();
    if (!client) return NextResponse.json({ error: 'Image storage is not configured.' }, { status: 503 });
    const url = client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    const { data, error: lookupError } = await client.from('testimonials').select('id')
      .eq('image_url', url).limit(1);
    if (lookupError) return NextResponse.json({ error: 'Could not check whether this image is in use.' }, { status: 503 });
    if (data?.length) {
      return NextResponse.json({ error: 'This image belongs to a saved testimonial.' }, { status: 409 });
    }
    const { error } = await client.storage.from(bucket).remove([path]);
    if (error) return NextResponse.json({ error: 'Could not remove the unused image.' }, { status: 503 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Could not remove the unused image.' }, { status: 400 });
  }
}
