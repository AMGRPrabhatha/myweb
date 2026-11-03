'use client';

import { useRef, useState } from 'react';
import { cleanupProjectCover, uploadProjectCover } from '@/lib/project-cover-upload-client';

export default function ProjectCoverField({ initialUrl }: { initialUrl: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [state, setState] = useState('');
  const uploadedPath = useRef<string>();

  async function changeFile(file?: File) {
    if (!file) return;
    setState('Uploading image...');
    try {
      const uploaded = await uploadProjectCover(file);
      const oldPath = uploadedPath.current;
      uploadedPath.current = uploaded.path;
      setUrl(uploaded.url);
      setState('');
      if (oldPath) void cleanupProjectCover(oldPath);
    } catch (error) {
      setState(error instanceof Error ? error.message : 'Image upload failed. Please try again.');
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label className="block font-bold text-ink mb-1.5">Upload Replacement Cover Image</label>
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={e => void changeFile(e.target.files?.[0])} className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs" />
        {state && <p role="alert" className="mt-1 text-red-700">{state}</p>}
      </div>
      <div>
        <label className="block font-bold text-ink mb-1.5">Or use Image URL / public path</label>
        <input name="coverImage" type="text" value={url} onChange={e => { setUrl(e.target.value); setState(''); }} required className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs" />
      </div>
      <input type="hidden" name="coverUploadError" value={state ? 'true' : ''} />
    </div>
  );
}
