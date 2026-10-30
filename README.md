# Cobalt & Kinetic Digital — Agency Web Application

A modern digital agency website built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth & Storage)** based on the October 2026 delivery specification.

The agency specializes in two coordinated services for startups and small businesses:
1. **Complete Website Development** (responsive interfaces, custom PostgreSQL databases, and protected staff administrative panels).
2. **Ongoing Social Media Management** (30-day content planning, static post design, captions, short-form video editing, and account triage across Facebook, Instagram, TikTok, and LinkedIn).

---

## 1. Visual & Architectural Design System

- **Warm White Palette:** Warm white surfaces (`#F7F5F0`), deep ink typography (`#151B25`), and electric cobalt accents (`#2F5BFF`).
- **Asymmetric Hero Section:** Hero visually pairs a responsive desktop web application mockup with matching 9:16 vertical short-form video and social post creatives.
- **Accessible & High-Performance:** Semantic landmarks, visible focus rings, WCAG 2.2 AA contrast standards, and reduced-motion preference support.
- **Package Selection Flow:** Plan selection buttons on the homepage, plans page, and service detail pages dynamically preselect options on the `/contact` form with URL parameters (`?plan=...&service=...`).
- **Decoupled Notification Pipeline:** Enquiries are saved atomically with a `notification_job` record before attempting email dispatch. Provider timeouts or delivery failures never invalidate the captured lead and can be inspected and retried from `/admin/notifications`.

---

## 2. Public Route Architecture

| Route | Purpose | Key Functionality |
| :--- | :--- | :--- |
| `/` | **Home** | Asymmetric hero, selected work, core services, startup benefits, plans preview, process steps, FAQ, final CTA |
| `/services` | **Services Overview** | High-level breakdown of Website Development, Social Management, and the combined delivery workflow |
| `/services/website-development` | **Service Detail** | Deliverables, agency vs. client responsibilities, process stages, and preselected contact CTA |
| `/services/social-media-management` | **Service Detail** | Monthly deliverables, video editing scope, counting rules, and preselected contact CTA |
| `/work` | **Portfolio Showcase** | Interactive category filter: *All*, *Combined Projects*, *Websites*, *Social Content* with labeled concept demos |
| `/work/[slug]` | **Project Case Study** | Problem statement, delivered scope breakdown, verified results, screenshot gallery, and targeted CTA |
| `/plans` | **Plans & Pricing** | Three tabs: *Websites*, *Social Media*, and *Website plus Social* with separate one-time vs. monthly billing presentation |
| `/about` | **About & Approach** | Working principles, founder/team structure, operating arrangements, and target clients |
| `/contact` | **Contact & Brief** | Server-validated form, honeypot bot challenge, duplicate submission prevention, and preselection banner |
| `/privacy` | **Privacy Notice** | Transparent data collection, retention policy, and deletion contact |
| `/terms` | **Terms of Service** | Proposal policies, milestone invoicing, and asset ownership terms |
| `/sitemap.xml` | **SEO Sitemap** | Automated dynamic sitemap excluding private staff `/admin` routes |
| `/robots.txt` | **Robots Policy** | Public indexing allowed with `/admin` disallowed |

---

## 3. Protected Staff Administration Panel (`/admin`)

- **`/admin` (Dashboard):** Real-time operational metrics (New Inquiries, Proposals Sent, Won Projects, Total Leads), recent briefs, and notification failure alerts.
- **`/admin/leads` (Enquiry Management):** Filterable lead directory by status (*New*, *Contacted*, *Proposal Sent*, *Won*, *Closed*) and search query.
- **`/admin/leads/[id]` (Lead Detail & Triage):** Full project brief, preselected plan snapshot, status update dropdown, and chronological internal staff follow-up notes timeline with next action dates.
- **`/admin/projects` & `/admin/projects/[id]` (Portfolio Editor):** Edit project titles, slugs, summaries, deliverables, concept flags, and published visibility.
- **`/admin/plans` (Plans Editor):** Configure plan deliverables, turnaround times, revision limits, and toggle draft/published states.
- **`/admin/notifications` (Alert Queue):** Live inspection of transactional email jobs, delivery state badges, error diagnostics, and one-click manual retry buttons.
- **`/admin/settings` (Site Settings):** Manage verified public business email, phone, WhatsApp number, office location, and official social media profile links.

---

## 4. Local Development Setup

### Prerequisites
- Node.js 18+ (tested with v25)
- npm 9+

### Installation

1. Clone or extract the repository:
   ```bash
   cd "Digital agency"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Configuration:
   ```bash
   cp .env.example .env.local
   ```
   *Note: The application includes a fallback data access layer. If Supabase keys are not set, the app runs locally with pre-seeded sample projects, plans, and working lead capture.*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) to view the staff portal.

5. Run Production Build & Verification Suite:
   ```bash
   npm run build
   node scripts/verify-workflows.js
   ```

---

## 5. Supabase Database Migration & RLS

To deploy to your production Supabase project:
1. Navigate to your Supabase project dashboard -> **SQL Editor**.
2. Run the migration file located at:
   ```
   supabase/migrations/20261025_initial_schema.sql
   ```
3. This creates:
   - Tables: `admin_profiles`, `leads`, `lead_notes`, `projects`, `project_media`, `plans`, `site_settings`, `notification_jobs`.
   - Custom ENUM types and performance indexes.
   - **Row Level Security (RLS)** policies granting public read access strictly to published marketing assets, while locking private leads, internal notes, and notification jobs to active staff profiles.
