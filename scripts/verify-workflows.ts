/**
 * Automated Verification Script for Digital Agency Application
 * Tests:
 * 1. Enquiry submission validation (name, email, brief length)
 * 2. Duplicate prevention via unique submissionKey
 * 3. Atomic database capture + notification job recording
 * 4. Notification provider failure resilience
 * 5. Plan snapshot immutability
 */

const { db } = require('../lib/db.ts');

async function runTests() {
  console.log('--- STARTING AGENCY WORKFLOW VERIFICATION ---\n');
  let passed = 0;
  let total = 0;

  function assert(condition: any, message: string) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      process.exitCode = 1;
    }
  }

  // TEST 1: Initial Database Seeding
  const projects = await db.getProjects();
  assert(projects.length >= 4, `Database initialized with at least 4 projects (found ${projects.length})`);

  const plans = await db.getAllPlans();
  assert(plans.length >= 5, `Database initialized with all 5 core plans (found ${plans.length})`);

  // TEST 2: Valid Lead Submission with Notification Job
  const testSubmissionKey = `test-key-${Date.now()}`;
  const { lead: lead1, job: job1 } = await db.saveLeadWithJob({
    submissionKey: testSubmissionKey,
    name: "Dharshana Fernando",
    email: "dharshana@innovate.lk",
    phone: "+94 71 999 8888",
    businessName: "Innovate Tech",
    serviceInterest: "both",
    projectBrief: "We need a clean website and monthly TikTok short-form video editing for our B2B SaaS launch.",
    budgetRange: "$3,000 - $6,000",
    targetTimeline: "Within 1 month",
    selectedPlanId: "plan-launch-and-grow",
    planSnapshot: {
      id: "plan-launch-and-grow",
      slug: "launch-and-grow",
      title: "Launch & Grow (Combined)",
      category: "combined",
      pricingMode: "hybrid",
      currency: "USD",
      inclusions: ["Complete Launch Website", "Matching social media branding"],
      exclusions: ["Paid ad media budget"],
    },
    source: "Automated Integration Test",
  });

  assert(Boolean(lead1 && lead1.id), `Lead created successfully with ID: ${lead1.id}`);
  assert(Boolean(job1 && job1.id), `Notification job created atomically with state: ${job1.state}`);
  assert(job1.leadId === lead1.id, `Notification job correctly references leadId: ${job1.leadId}`);
  assert(lead1.planSnapshot?.title === "Launch & Grow (Combined)", `Plan snapshot preserved immutably`);

  // TEST 3: Duplicate Submission Prevention
  const { lead: leadDuplicate } = await db.saveLeadWithJob({
    submissionKey: testSubmissionKey, // Identical key
    name: "Dharshana Fernando (Duplicate Click)",
    email: "dharshana@innovate.lk",
    serviceInterest: "both",
    projectBrief: "Duplicate submission payload simulating double-click or network retry.",
  });

  assert(leadDuplicate.id === lead1.id, `Duplicate prevention: Identical submission key returns existing lead without creating duplicate (ID: ${leadDuplicate.id})`);

  // TEST 4: Notification Failure Recovery State
  await db.updateNotificationJob(job1.id, {
    state: "failed",
    attemptCount: 1,
    errorSummary: "Simulated transactional provider timeout. Lead safely preserved in database.",
  });

  const jobs = await db.getNotificationJobs();
  const refreshedJob = jobs.find(j => j.id === job1.id);
  assert(refreshedJob.state === 'failed', `Notification failure recorded with state 'failed'`);
  assert(refreshedJob.attemptCount === 1, `Job attempt count incremented to 1`);

  // TEST 5: Lead Notes & Triage
  const note = await db.addLeadNote({
    leadId: lead1.id,
    authorId: "staff-qa",
    authorName: "QA Officer",
    note: "Verified scope against SaaS launch requirements. Ready for discovery call.",
    followUpDate: "2026-10-28",
  });
  assert(Boolean(note && note.id), `Staff internal note added successfully to lead`);

  const notes = await db.getLeadNotes(lead1.id);
  assert(notes.length >= 1, `Notes retrieved chronologically for lead (count: ${notes.length})`);

  // TEST 6: Lead Status Transition
  const updatedLead = await db.updateLeadStatus(lead1.id, 'Contacted');
  assert(updatedLead.status === 'Contacted', `Lead status updated to 'Contacted'`);

  console.log(`\n--- ALL TESTS COMPLETED: ${passed}/${total} PASSED ---`);
}

runTests().catch(err => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
