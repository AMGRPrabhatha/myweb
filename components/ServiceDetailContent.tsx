import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowDown, Check, Plus, PanelsTopLeft, CalendarDays, Database, Video, ShieldCheck, FileText, Globe2, Share2 } from 'lucide-react';
import HeroTicker from './HeroTicker';
import styles from './ServiceDetailContent.module.css';

interface ServiceDetailData {
  title: string;
  categoryPill: string;
  tagline: string;
  description: string;
  deliverables: string[];
  responsibilities: { agency: string[]; client: string[] };
  process: string[];
  exclusions: string[];
  preselectedService: 'website' | 'social';
}

function Illustration({ social, alternate = false }: { social: boolean; alternate?: boolean }) {
  return <div className={styles.illustration} aria-hidden="true">
    <div className={styles.previewTop}><span /><span /><span /><p>{social ? (alternate ? 'Creative studio' : 'Content calendar') : (alternate ? 'Connected platform' : 'Website experience')}</p></div>
    {social ? <div className={styles.socialPreview}>
      <div className={styles.previewSidebar}><span /><span /><span /><span /></div>
      {alternate ? <div className={styles.creativePreview}><div><Video size={36} strokeWidth={1.4} /><span>Stories in motion.</span></div><div><span>Made to<br />connect.</span></div></div> : <div className={styles.calendar}><div>Plan your next story.</div>{Array.from({ length: 15 }, (_, i) => <span key={i} className={i % 4 === 0 ? styles.calendarActive : undefined}>{String(i + 1).padStart(2, '0')}{i % 4 === 0 && <i />}</span>)}</div>}
    </div> : alternate ? <div className={styles.platformPreview}><div><Database size={32} strokeWidth={1.5} /><strong>One connected platform</strong><span>Website · Forms · Content</span></div><ul>{['Structured data', 'Protected staff access', 'Enquiry workflow'].map(item => <li key={item}><Check size={13} />{item}</li>)}</ul></div> : <div className={styles.websitePreview}><div><span>YOUR NEXT CHAPTER</span><strong>A better place<br />to begin.</strong><i /><i /></div><div className={styles.siteGraphic}><span /><span /><span /></div><footer><span>Designed for people.</span><ArrowUpRight size={15} /></footer></div>}
  </div>;
}

const webDeliverableTitles = ['Responsive websites', 'Connected data', 'Staff administration', 'Enquiry workflows', 'Accessible experiences', 'Search foundations', 'Launch & hosting', 'Full handover'];
const socialDeliverableTitles = ['A clear content calendar', 'Visuals for every platform', 'Short-form video', 'A consistent brand voice', 'Publishing & scheduling', 'Community management', 'Monthly reporting'];

export default function ServiceDetailContent({ data }: { data: ServiceDetailData }) {
  const social = data.preselectedService === 'social';
  const deliverableTitles = social ? socialDeliverableTitles : webDeliverableTitles;
  const ecosystem = social ? ['Instagram', 'Facebook', 'TikTok', 'LinkedIn'] : ['Next.js', 'TypeScript', 'Supabase', 'Responsive UI'];
  const enquiry = `/contact?service=${data.preselectedService}`;
  const plans = `/plans?category=${social ? 'social' : 'website'}#packages`;
  const steps = social ? ['Audit', 'Plan', 'Create', 'Review', 'Publish'] : ['Discover', 'Design', 'Build', 'Review', 'Launch'];

  return <div className={`${styles.page} ${social ? styles.social : styles.website}`}>
    <section className={styles.hero} aria-labelledby="service-detail-heading">
      <div className={styles.heroArt} aria-hidden="true" />
      <div className={styles.container}>
        <Link href="/services" className={styles.back}><ArrowLeft size={15} aria-hidden="true" /> All services</Link>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{social ? 'Social media & video production' : 'Website development & web portals'}</p>
            <h1 id="service-detail-heading">{social ? <>Content that connects.<br />A brand that feels like you.</> : <>A better website.<br />A stronger digital presence.</>}</h1>
            <p className={styles.heroDescription}>{data.tagline}</p>
            <div className={styles.actions}><Link href={enquiry} className={`${styles.primary} brand-gradient-button`}>Request a proposal <ArrowRight size={16} aria-hidden="true" /></Link><Link href={plans} className={styles.textLink}>Explore packages <ArrowRight size={16} aria-hidden="true" /></Link></div>
            <a className={styles.jump} href="#overview">See how it comes together <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
          <figure className={styles.heroVisual}><Illustration social={social} /><figcaption>{social ? 'From your content calendar to the next conversation.' : 'From the first idea to the finished experience.'}</figcaption></figure>
        </div>
      </div>
    </section>
    <HeroTicker />

    <nav className={`${styles.container} ${styles.sectionNav}`} aria-label="Service details"><span>{social ? 'Social media' : 'Website development'}</span><div>{[['overview', 'Overview'], ['deliverables', 'Deliverables'], ['process', 'Our process'], ['collaboration', 'Working together'], ['scope', 'Scope']].map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}</div></nav>

    <section id="overview" className={`${styles.section} ${styles.container}`} aria-labelledby="overview-heading">
      <div className={styles.overviewGrid}>
        <div><p className={styles.eyebrow}>The service, at a glance</p><h2 id="overview-heading">{social ? 'Your story, across the places that matter.' : 'Built around the way your business works.'}</h2><p className={styles.body}>{data.description}</p><Link href={enquiry} className={styles.textLink}>Talk through your requirements <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className={styles.ecosystem}><p>{social ? 'The platforms we work across' : 'The foundations we build with'}</p><ul>{ecosystem.map((name,i) => <li key={name} className={styles[`orb${i}`]}>{name}</li>)}</ul><span>{social ? 'Channels are agreed as part of your scope.' : 'A connected toolkit for your website and portal.'}</span></div>
      </div>
    </section>

    <section id="deliverables" className={`${styles.section} ${styles.tinted}`} aria-labelledby="deliverables-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>What’s included</p><h2 id="deliverables-heading">{social ? 'From a clear plan to content worth sharing.' : 'The details behind a complete digital experience.'}</h2></div><p>Each deliverable is agreed in your scope, so you know what’s being created and how it fits together.</p></div>
        <div className={styles.featuredGrid}>{data.deliverables.slice(0,2).map((item,i) => <article className={styles.featureCard} key={item}><div className={`${styles.featureArt} ${i === 1 ? styles.alternateArt : ''}`}><Illustration social={social} alternate={i === 1} /></div><div className={styles.featureCopy}><h3>{deliverableTitles[i]}</h3><p>{item}</p></div></article>)}</div>
        <div className={`${styles.deliverableGrid} mobile-card-rail`}>{data.deliverables.slice(2).map((item,i) => <article key={item}><span className={styles.smallIcon}>{social ? (i % 2 ? <Share2 size={21} /> : <Video size={21} />) : (i % 2 ? <Globe2 size={21} /> : <ShieldCheck size={21} />)}</span><h3>{deliverableTitles[i + 2]}</h3><p>{item}</p></article>)}</div>
      </div>
    </section>

    <section id="process" className={`${styles.section} ${styles.container}`} aria-labelledby="process-heading">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>How we work</p><h2 id="process-heading">A clear path, from the first conversation.</h2></div><p>Five connected stages keep decisions, feedback and delivery moving in the same direction.</p></div>
      <div className={styles.processGrid}><div className={styles.accordion}>{data.process.map((step,i) => { const colon = step.indexOf(':'); return <details key={step} open={i === 0}><summary><span>{String(i+1).padStart(2,'0')}</span><h3>{colon >= 0 ? step.slice(0,colon) : step}</h3><Plus size={18} aria-hidden="true" /></summary><p>{colon >= 0 ? step.slice(colon+1).trim() : step}</p></details>; })}</div><figure className={styles.processVisual}><div className={styles.workflowCard}><span className={styles.workflowLabel}>{social ? 'Content delivery' : 'Website delivery'}</span><h3>{social ? 'A story takes shape.' : 'An idea becomes an experience.'}</h3><ol>{steps.map((step,i) => <li key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}<Check size={15} aria-hidden="true" /></li>)}</ol><p>Plan together. Review together. Launch together.</p></div><figcaption>Our delivery stages · illustrative workflow</figcaption></figure></div>
    </section>

    <section id="collaboration" className={`${styles.section} ${styles.tinted}`} aria-labelledby="collaboration-heading"><div className={styles.container}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Working together</p><h2 id="collaboration-heading">Shared direction. Clear responsibilities.</h2></div><p>A good result depends on knowing who handles what, from the beginning.</p></div>
      <div className={styles.roles}>{[['agency','What we take care of'],['client','What we need from you']].map(([role,title]) => <article key={role}><span className={styles.smallIcon}>{role === 'agency' ? <ShieldCheck size={22} aria-hidden="true" /> : <FileText size={22} aria-hidden="true" />}</span><h3>{title}</h3><ul>{data.responsibilities[role as 'agency' | 'client'].map(item => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul></article>)}</div>
    </div></section>

    <section id="scope" className={`${styles.section} ${styles.container}`} aria-labelledby="scope-heading"><div className={styles.scopeGrid}><div><p className={styles.eyebrow}>A clear scope</p><h2 id="scope-heading">Know what sits outside the package.</h2><p className={styles.body}>These items are excluded from the standard service scope. If you need them, we’ll discuss the requirements and any separate costs before work begins.</p><Link href={enquiry} className={styles.textLink}>Discuss your scope <ArrowRight size={16} aria-hidden="true" /></Link></div><ul className={styles.exclusions}>{data.exclusions.map((item,i) => <li key={item}><span>{String(i+1).padStart(2,'0')}</span><p>{item}</p></li>)}</ul></div></section>

    <section className={`${styles.container} ${styles.related}`} aria-labelledby="related-service-heading"><div className={styles.relatedCopy}><p className={styles.eyebrow}>Better, connected</p><h2 id="related-service-heading">{social ? 'Give your content a website to come home to.' : 'Bring your website into the conversation.'}</h2><p>{social ? 'Explore website development to create a connected experience from the social feed to your own platform.' : 'Explore social media management to keep your brand’s story moving beyond your website.'}</p><Link href={`/services/${social ? 'website-development' : 'social-media-management'}`} className={styles.textLink}>{social ? 'Explore website development' : 'Explore social media management'}<ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className={styles.relatedArt} aria-hidden="true">{social ? <PanelsTopLeft size={100} strokeWidth={1} /> : <CalendarDays size={100} strokeWidth={1} />}</div></section>
  </div>;
}
