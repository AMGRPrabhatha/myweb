# Agency Staff Administration Guide

This guide describes operational workflows for staff members managing inbound client briefs, updating project portfolios, configuring service packages, and inspecting transactional notifications.

---

## 1. Accessing the Staff Portal

- **URL:** Navigate to `/admin` (or `/admin/login`).
- **Authentication:** Staff users sign in with Supabase Auth credentials. Every admin page and mutation checks for an active matching `admin_profiles` record. Without Supabase configuration, the portal stays closed.
- **Setup:** Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` on the server. Apply `supabase/migrations/20261025_initial_schema.sql`, create a user in Supabase Authentication, then add an active row in `admin_profiles` with the same Auth user ID. There are no default credentials.
- **Roles:** The schema records `owner` and `editor`. Both currently have access to the admin portal and its actions; role-specific restrictions have not been implemented.

---

## 2. Managing Enquiries & Lead Triage (`/admin/leads`)

When a visitor submits the brief form on `/contact`, a private record is created with:
- Contact details (Name, Email, Phone, Company).
- Service interest (Website, Social Media, Both, or Help Me Decide).
- Project Brief (minimum 15 characters).
- Preselected Plan Snapshot (preserves inclusions/exclusions as they existed at the time of enquiry).
- Budget guideline and target timeline.

### Lead Status Lifecycle
1. **New:** Newly received submission requiring initial team review.
2. **Contacted:** Staff has sent initial email response or held a preliminary discovery call.
3. **Proposal Sent:** Formal scope of work, milestone schedule, and proposal have been delivered to the client.
4. **Won:** Client countersigned proposal and settled project commencement deposit.
5. **Closed:** Enquiry archived, rejected, or project completed.

### Internal Notes & Follow-up Dates
From any lead detail page (`/admin/leads/[id]`):
1. Review the client brief and preselected plan snapshot.
2. Enter internal triage notes in the right-hand panel (e.g. *"Discovery call scheduled for Thursday 2 PM with founder"*).
3. Optionally specify a **Next Follow-up Date** to track pending client responses.
4. Click **Save Internal Note** to append to the chronological audit timeline.

---

## 3. Notification Queue & Error Recovery (`/admin/notifications`)

The system utilizes an asynchronous retry-job pattern:
1. When an enquiry is submitted, the lead and a `notification_job` are written atomically to the database.
2. The server attempts to send an alert email via Resend / transactional email provider.
3. If the provider rejects the payload or encounters a network timeout:
   - The captured lead **remains safely preserved in the database**.
   - The notification job state changes to `failed` with a diagnostic error summary.
   - An alert banner appears on the main admin dashboard (`/admin`).
4. To retry delivery:
   - Navigate to `/admin/notifications`.
   - Review the error diagnostic.
   - Click **Retry Alert** to re-dispatch the notification.

---

## 4. Updating Portfolio Case Studies (`/admin/projects`)

- **Draft vs. Published:** Set a project's status to `draft` while gathering screenshots and drafting copy. Draft items are completely excluded from public visitors and search engine sitemaps.
- **Concept Demonstration Flag:** For concept projects, maintain `isConcept: true`. This ensures an honest, prominent badge appears across the website in compliance with truthful agency advertising rules.
- **Scope Items:** Add or remove delivered scope items line-by-line to adjust the bullet points displayed on the case study page.

---

## 5. Site Settings & Verified Contact Info (`/admin/settings`)

Use this screen to manage public business information:
- Agency Name & Tagline
- Official Business Email & Phone
- WhatsApp Business Number (used for the floating chat button)
- Public Office Location
- Official Social Media URLs (Facebook, Instagram, TikTok, LinkedIn)

*Note: Privileged database credentials, service role keys, and email API tokens are stored strictly in server environment variables and never entered into this form.*
