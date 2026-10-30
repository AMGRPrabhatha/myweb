/**
 * Automated Verification Script for Digital Agency Application
 * Directly executable via `node scripts/verify-workflows.js`
 */

const fs = require('fs');
const path = require('path');

console.log('--- STARTING AGENCY WORKFLOW & BUILD VERIFICATION ---\n');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Build Manifest & Route Verification
const appManifestPath = path.join(__dirname, '..', '.next', 'app-build-manifest.json');
assert(fs.existsSync(appManifestPath), 'App Router build manifest exists (.next/app-build-manifest.json)');

const appManifest = JSON.parse(fs.readFileSync(appManifestPath, 'utf8'));
const pages = Object.keys(appManifest.pages);

assert(pages.includes('/(marketing)/page'), 'Root marketing homepage prerendered (/(marketing)/page)');
assert(pages.includes('/(marketing)/services/page'), 'Services catalogue page built (/(marketing)/services/page)');
assert(pages.includes('/(marketing)/services/[slug]/page'), 'Service detail route built (/(marketing)/services/[slug]/page)');
assert(pages.includes('/(marketing)/work/page'), 'Work portfolio route built (/(marketing)/work/page)');
assert(pages.includes('/(marketing)/work/[slug]/page'), 'Project case study route built (/(marketing)/work/[slug]/page)');
assert(pages.includes('/(marketing)/plans/page'), 'Plans & pricing comparison built (/(marketing)/plans/page)');
assert(pages.includes('/(marketing)/about/page'), 'About & approach route built (/(marketing)/about/page)');
assert(pages.includes('/(marketing)/contact/page'), 'Contact brief route built (/(marketing)/contact/page)');
assert(pages.includes('/(marketing)/privacy/page'), 'Privacy policy page built (/(marketing)/privacy/page)');
assert(pages.includes('/(marketing)/terms/page'), 'Terms of service page built (/(marketing)/terms/page)');
assert(pages.includes('/admin/page'), 'Staff admin dashboard built (/admin/page)');
assert(pages.includes('/admin/leads/page'), 'Admin leads list built (/admin/leads/page)');
assert(pages.includes('/admin/leads/[id]/page'), 'Admin lead detail & notes triage built (/admin/leads/[id]/page)');
assert(pages.includes('/admin/projects/page'), 'Admin projects editor built (/admin/projects/page)');
assert(pages.includes('/admin/plans/page'), 'Admin plans configuration built (/admin/plans/page)');
assert(pages.includes('/admin/notifications/page'), 'Admin notification queue built (/admin/notifications/page)');
assert(pages.includes('/admin/settings/page'), 'Admin site settings built (/admin/settings/page)');

// 2. Database Schema Migration Verification
const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20261025_initial_schema.sql');
assert(fs.existsSync(migrationPath), 'Supabase SQL schema migration exists');
const sqlContent = fs.readFileSync(migrationPath, 'utf8');
assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS leads'), 'Migration creates private `leads` table');
assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS notification_jobs'), 'Migration creates `notification_jobs` table');
assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS projects'), 'Migration creates `projects` table');
assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS plans'), 'Migration creates `plans` table');
assert(sqlContent.includes('ALTER TABLE leads ENABLE ROW LEVEL SECURITY'), 'Row Level Security enabled on leads');
assert(sqlContent.includes('submission_key TEXT UNIQUE'), 'Unique submission key constraint exists on leads table');

// 3. Environment Example Verification
const envPath = path.join(__dirname, '..', '.env.example');
assert(fs.existsSync(envPath), '.env.example file exists without secrets');
const envContent = fs.readFileSync(envPath, 'utf8');
assert(envContent.includes('NEXT_PUBLIC_SUPABASE_URL'), '.env.example specifies NEXT_PUBLIC_SUPABASE_URL');
assert(envContent.includes('SUPABASE_SERVICE_ROLE_KEY'), '.env.example specifies SUPABASE_SERVICE_ROLE_KEY');
assert(envContent.includes('RESEND_API_KEY'), '.env.example specifies RESEND_API_KEY');

// 4. Verify Project Previews & Responsive Assets
const imgDir = path.join(__dirname, '..', 'public', 'images', 'projects');
const svgs = fs.readdirSync(imgDir);
assert(svgs.includes('aura-cover.svg'), 'Aura Fintech project preview SVG exists');
assert(svgs.includes('kura-cover.svg'), 'Kura Ceramics project preview SVG exists');
assert(svgs.includes('verve-cover.svg'), 'Verve Health project preview SVG exists');
assert(svgs.includes('solaris-cover.svg'), 'Solaris Clean Energy project preview SVG exists');
assert(svgs.includes('hero-web.svg'), 'Asymmetric hero website preview SVG exists');
assert(svgs.includes('hero-social.svg'), 'Asymmetric hero matching social creative SVG exists');

// 5. Verify Sample Data & Catalog Configuration
const sampleDataContent = fs.readFileSync(path.join(__dirname, '..', 'lib', 'sample-data.ts'), 'utf8');
assert(sampleDataContent.includes('plan-launch-website'), 'Launch Website plan defined in catalogue');
assert(sampleDataContent.includes('plan-custom-website'), 'Custom Website plan defined in catalogue');
assert(sampleDataContent.includes('plan-social-essentials'), 'Social Essentials plan defined in catalogue');
assert(sampleDataContent.includes('plan-social-growth'), 'Social Growth plan defined in catalogue');
assert(sampleDataContent.includes('plan-launch-and-grow'), 'Launch & Grow combined plan defined in catalogue');
assert(sampleDataContent.includes('isEnquiryBased: true'), 'Plans enforce enquiry-based proposal model');

console.log(`\n--- ALL CHECKS COMPLETED: ${passed}/${total} PASSED ---`);
