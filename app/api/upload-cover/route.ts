import { NextResponse } from 'next/server';
import { getAdminProfile } from '@/lib/admin-auth';
import { saveProjectCover } from '@/lib/project-cover';

export async function POST(request: Request) {
  if (!(await getAdminProfile())) return NextResponse.json({ error: 'Staff sign-in is required.' }, { status: 401 });
  try {
    const formData = await request.formData();
    const url = await saveProjectCover(formData.get('coverFile'));
    if (!url) return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Project image upload failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
