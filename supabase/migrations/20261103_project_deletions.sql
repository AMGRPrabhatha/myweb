-- Bundled portfolio projects cannot be removed from Vercel's read-only files.
-- Record their removal in the same database used by the staff portal.
CREATE TABLE IF NOT EXISTS public.project_deletions (
    project_id TEXT PRIMARY KEY,
    deleted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    deleted_by UUID NOT NULL REFERENCES auth.users(id)
);

ALTER TABLE public.project_deletions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active admins manage project deletions"
    ON public.project_deletions FOR ALL TO authenticated
    USING (agency_private.is_active_admin())
    WITH CHECK (agency_private.is_active_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_deletions TO authenticated;
GRANT SELECT ON public.project_deletions TO service_role;
