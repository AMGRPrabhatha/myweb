import { NextResponse } from 'next/server';
import { createAdminSessionClient, getAdminProfile } from '@/lib/admin-auth';

const bucket = 'project-covers';
const maxBytes = 10 * 1024 * 1024;
const imageTypes: Record<string, string> = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/avif': 'avif',
};

export async function POST(request: Request) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ error: 'Staff sign-in is required.' }, { status: 401 });
  try {
    const input = await request.json();
    const size = Number(input?.size);
    const type = String(input?.type ?? '');
    if (!imageTypes[type] || !Number.isSafeInteger(size) || size < 1 || size > maxBytes) {
      return NextResponse.json({ error: 'Choose a PNG, JPEG, WebP, GIF, or AVIF image under 10 MB.' }, { status: 400 });
    }
    const client = createAdminSessionClient();
    if (!client) return NextResponse.json({ error: 'Storage is not configured.' }, { status: 503 });
    const path = `incoming/${admin.user.id}/${crypto.randomUUID()}.${imageTypes[type]}`;
    const { data, error } = await client.storage.from(bucket).createSignedUploadUrl(path);
    if (error || !data?.token) {
      console.error('Could not sign project cover upload:', error?.name);
      return NextResponse.json({ error: 'Could not prepare image upload. Check the Supabase Storage bucket and admin permissions.' }, { status: 503 });
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
    if (typeof path !== 'string' || !new RegExp(`^incoming/${admin.user.id}/[a-f0-9-]+\\.(png|jpg|webp|gif|avif)$`).test(path)) {
      return NextResponse.json({ error: 'Invalid image path.' }, { status: 400 });
    }
    const client = createAdminSessionClient();
    if (!client) return NextResponse.json({ error: 'Storage is not configured.' }, { status: 503 });
    const url = client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    const { data: linked, error: lookupError } = await client.from('projects').select('id').eq('cover_image', url).limit(1);
    if (lookupError) return NextResponse.json({ error: 'Could not check whether the image is in use.' }, { status: 503 });
    if (linked?.length) return NextResponse.json({ error: 'Image belongs to a saved project.' }, { status: 409 });
    const { error } = await client.storage.from(bucket).remove([path]);
    if (error) return NextResponse.json({ error: 'Could not clean up image.' }, { status: 503 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Could not clean up image.' }, { status: 400 });
  }
}
