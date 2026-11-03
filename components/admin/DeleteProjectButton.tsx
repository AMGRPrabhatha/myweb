'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteProjectAction } from '@/lib/actions';

export default function DeleteProjectButton({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function handleDelete() {
    if (!window.confirm(`Delete “${projectTitle}” from the portfolio? This will remove its public page.`)) return;
    setError('');
    startTransition(async () => {
      try {
        const result = await deleteProjectAction(projectId);
        if (!result.success) {
          setError(result.error ?? 'Could not delete this project.');
          return;
        }
        router.refresh();
      } catch {
        setError('Could not delete this project. Please try again.');
      }
    });
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button type="button" onClick={handleDelete} disabled={pending} className="inline-flex items-center gap-1 font-bold text-rose-600 hover:text-rose-800 disabled:opacity-50">
        <Trash2 className="h-3 w-3" aria-hidden="true" /> {pending ? 'Deleting…' : 'Delete'}
      </button>
      {error && <span role="alert" className="max-w-36 text-[10px] text-rose-700">{error}</span>}
    </span>
  );
}
