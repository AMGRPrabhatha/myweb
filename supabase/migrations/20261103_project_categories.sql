-- Match the categories already offered by the project editor.
-- Existing project RLS policies and project_media's ON DELETE CASCADE remain in place.
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_category_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_category_check
    CHECK (category IN (
        'Websites', 'Web Design', 'UI/UX Design', 'Mobile Apps',
        'Social Content', 'Combined Projects'
    ));

-- Only media rows belonging to the deleted project are removed by its FK.
ALTER TABLE public.project_media DROP CONSTRAINT IF EXISTS project_media_project_id_fkey;
ALTER TABLE public.project_media ADD CONSTRAINT project_media_project_id_fkey
    FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;
