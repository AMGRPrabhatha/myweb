-- ====================================================================
-- Digital Agency Website: Initial Schema Migration
-- Designed for Supabase PostgreSQL with Row Level Security (RLS)
-- Specification Date: 25 October 2026
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Keep authorization helpers outside the public Data API schema.
CREATE SCHEMA IF NOT EXISTS agency_private;
REVOKE ALL ON SCHEMA agency_private FROM PUBLIC;
GRANT USAGE ON SCHEMA agency_private TO authenticated;

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Proposal Sent', 'Won', 'Closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE plan_category AS ENUM ('website', 'social', 'combined');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pricing_mode AS ENUM ('fixed', 'milestone', 'recurring', 'hybrid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_state AS ENUM ('pending', 'success', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. ADMIN PROFILES
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('owner', 'editor')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'current',
    agency_name TEXT NOT NULL DEFAULT 'Cobalt & Kinetic Digital',
    tagline TEXT NOT NULL DEFAULT 'Your website and social media, working together.',
    business_email TEXT NOT NULL DEFAULT 'hello@cobaltkinetic.example.com',
    phone TEXT NOT NULL DEFAULT '+1 (555) 019-2834',
    whatsapp_number TEXT NOT NULL DEFAULT '+15550192834',
    response_expectation TEXT NOT NULL DEFAULT 'Within 1 business day',
    office_location TEXT NOT NULL DEFAULT 'Colombo & Remote / Distributed',
    facebook_url TEXT DEFAULT 'https://facebook.com/example',
    instagram_url TEXT DEFAULT 'https://instagram.com/example',
    tiktok_url TEXT DEFAULT 'https://tiktok.com/@example',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/company/example',
    github_url TEXT DEFAULT 'https://github.com/example',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. PLANS
CREATE TABLE IF NOT EXISTS plans (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    category plan_category NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    pricing_mode pricing_mode NOT NULL DEFAULT 'fixed',
    one_time_amount NUMERIC(10, 2),
    monthly_amount NUMERIC(10, 2),
    currency TEXT NOT NULL DEFAULT 'USD',
    is_enquiry_based BOOLEAN NOT NULL DEFAULT true,
    inclusions TEXT[] NOT NULL DEFAULT '{}',
    exclusions TEXT[] NOT NULL DEFAULT '{}',
    turnaround_time TEXT,
    revisions TEXT,
    status project_status NOT NULL DEFAULT 'published',
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    client_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Websites', 'Social Content', 'Combined Projects')),
    summary TEXT NOT NULL,
    is_concept BOOLEAN NOT NULL DEFAULT true,
    business_need TEXT NOT NULL,
    delivered_scope TEXT[] NOT NULL DEFAULT '{}',
    results_summary TEXT,
    cover_image TEXT NOT NULL,
    status project_status NOT NULL DEFAULT 'published',
    display_order INT NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. PROJECT MEDIA
CREATE TABLE IF NOT EXISTS project_media (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    storage_object_key TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. LEADS (PRIVATE)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_key TEXT UNIQUE NOT NULL, -- prevents accidental duplicates
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    business_name TEXT,
    service_interest TEXT NOT NULL CHECK (service_interest IN ('website', 'social', 'both', 'help_me_decide')),
    project_brief TEXT NOT NULL,
    budget_range TEXT,
    target_timeline TEXT,
    existing_website TEXT,
    existing_platforms TEXT,
    selected_plan_id TEXT REFERENCES plans(id) ON DELETE SET NULL,
    plan_snapshot JSONB, -- preserves snapshot of plan at time of enquiry
    source TEXT DEFAULT 'organic',
    status lead_status NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. LEAD NOTES (PRIVATE)
CREATE TABLE IF NOT EXISTS lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    note TEXT NOT NULL,
    follow_up_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. NOTIFICATION JOBS (PRIVATE)
CREATE TABLE IF NOT EXISTS notification_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL DEFAULT 'lead_created',
    state notification_state NOT NULL DEFAULT 'pending',
    attempt_count INT NOT NULL DEFAULT 0,
    next_attempt_time TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    error_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_projects_status_order ON projects(status, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_plans_status_order ON plans(status, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_notification_jobs_state ON notification_jobs(state, next_attempt_time);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_jobs ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES:
-- Anyone can read approved public site settings
CREATE POLICY "Public read site_settings"
    ON site_settings FOR SELECT
    USING (true);

-- Anyone can read published plans
CREATE POLICY "Public read published plans"
    ON plans FOR SELECT
    USING (status = 'published');

-- Anyone can read published projects
CREATE POLICY "Public read published projects"
    ON projects FOR SELECT
    USING (status = 'published');

-- Anyone can read media of published projects
CREATE POLICY "Public read project_media"
    ON project_media FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_media.project_id
            AND projects.status = 'published'
        )
    );

-- STAFF/ADMIN POLICIES:
-- Helper function to check if current user is an active admin
CREATE OR REPLACE FUNCTION agency_private.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE auth_user_id = (SELECT auth.uid())
        AND is_active = true
    );
$$;
REVOKE ALL ON FUNCTION agency_private.is_active_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION agency_private.is_active_admin() TO authenticated;

-- Admin profiles: only active admins can read
CREATE POLICY "Admins read profiles"
    ON admin_profiles FOR SELECT TO authenticated
    USING (agency_private.is_active_admin());

-- Leads: only active admins can read/update leads
CREATE POLICY "Admins read leads"
    ON leads FOR SELECT TO authenticated
    USING (agency_private.is_active_admin());

CREATE POLICY "Admins update leads"
    ON leads FOR UPDATE TO authenticated
    USING (agency_private.is_active_admin());

-- Lead notes: only active admins can read/insert notes
CREATE POLICY "Admins read lead notes"
    ON lead_notes FOR SELECT TO authenticated
    USING (agency_private.is_active_admin());

CREATE POLICY "Admins insert lead notes"
    ON lead_notes FOR INSERT TO authenticated
    WITH CHECK (agency_private.is_active_admin());

-- Notification jobs: only active admins can read/update
CREATE POLICY "Admins manage notification_jobs"
    ON notification_jobs FOR ALL TO authenticated
    USING (agency_private.is_active_admin());

-- Projects, Plans, Media: Admins can manage all (including drafts)
CREATE POLICY "Admins manage projects"
    ON projects FOR ALL TO authenticated
    USING (agency_private.is_active_admin());

CREATE POLICY "Admins manage project_media"
    ON project_media FOR ALL TO authenticated
    USING (agency_private.is_active_admin());

CREATE POLICY "Admins manage plans"
    ON plans FOR ALL TO authenticated
    USING (agency_private.is_active_admin());

CREATE POLICY "Admins manage site_settings"
    ON site_settings FOR ALL TO authenticated
    USING (agency_private.is_active_admin());

-- Data API table privileges are separate from RLS. These grants do not
-- bypass the policies above; no anonymous write access is granted.
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON site_settings, plans, projects, project_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON site_settings, plans, projects, project_media TO authenticated;
GRANT SELECT ON admin_profiles TO authenticated;
GRANT SELECT, UPDATE ON leads TO authenticated;
GRANT SELECT, INSERT ON lead_notes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON notification_jobs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_profiles, site_settings, plans,
    projects, project_media, leads, lead_notes, notification_jobs TO service_role;
