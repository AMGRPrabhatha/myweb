-- Real testimonial records. Bundled examples are deliberately not inserted.
BEGIN;

DO $$
BEGIN
    IF to_regclass('public.testimonials') IS NOT NULL THEN
        RAISE EXCEPTION 'public.testimonials already exists; inspect it before applying this migration';
    END IF;
    IF to_regprocedure('agency_private.is_active_admin()') IS NULL THEN
        RAISE EXCEPTION 'Apply the existing admin schema before creating testimonials';
    END IF;
END
$$;

CREATE TABLE public.testimonials (
    id TEXT PRIMARY KEY CHECK (length(btrim(id)) BETWEEN 1 AND 120),
    client_name TEXT NOT NULL CHECK (length(btrim(client_name)) > 0),
    client_role TEXT NOT NULL DEFAULT '',
    company_name TEXT NOT NULL CHECK (length(btrim(company_name)) > 0),
    company_subtitle TEXT NOT NULL DEFAULT '',
    quote TEXT NOT NULL CHECK (length(btrim(quote)) > 0),
    full_review TEXT,
    video_duration TEXT,
    image_url TEXT NOT NULL CHECK (
        (image_url ~ '^https://[^/[:space:]]+' OR image_url ~ '^/[^/]')
        AND image_url !~ '[[:space:]]'
    ),
    company_logo TEXT,
    rating SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    highlight_kpi TEXT NOT NULL DEFAULT '',
    service_category TEXT NOT NULL DEFAULT 'Combined Delivery' CHECK (
        service_category IN ('Website Development', 'Social Media', 'Combined Delivery')
    ),
    publication_status TEXT NOT NULL DEFAULT 'published' CHECK (
        publication_status IN ('draft', 'published')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX testimonials_published_updated_idx
    ON public.testimonials (updated_at DESC)
    WHERE publication_status = 'published';

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.testimonials FROM anon, authenticated;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;

CREATE POLICY "Public read published testimonials"
    ON public.testimonials FOR SELECT TO anon, authenticated
    USING (publication_status = 'published');

CREATE POLICY "Active admins read all testimonials"
    ON public.testimonials FOR SELECT TO authenticated
    USING (agency_private.is_active_admin());

CREATE POLICY "Active admins create testimonials"
    ON public.testimonials FOR INSERT TO authenticated
    WITH CHECK (agency_private.is_active_admin());

CREATE POLICY "Active admins edit testimonials"
    ON public.testimonials FOR UPDATE TO authenticated
    USING (agency_private.is_active_admin())
    WITH CHECK (agency_private.is_active_admin());

CREATE POLICY "Active admins delete testimonials"
    ON public.testimonials FOR DELETE TO authenticated
    USING (agency_private.is_active_admin());

COMMIT;
