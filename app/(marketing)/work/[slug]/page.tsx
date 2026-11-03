import TypewriterText from '@/components/TypewriterText';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Tag } from 'lucide-react';
import styles from './ProjectDetail.module.css';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await db.getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await db.getProjectBySlug(params.slug);
  if (!project) notFound();

  const serviceParam = project.category === 'Combined Projects' ? 'both' :
    ['Websites', 'Web Design'].includes(project.category) ? 'website' :
    project.category === 'Social Content' ? 'social' : 'help_me_decide';
  const enquiryHref = `/contact?service=${serviceParam}&source=${encodeURIComponent(`Project Case Study: ${project.title}`)}`;

  const gallery = [...project.galleryImages]
    .filter(media => media.url !== project.coverImage)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const projects = await db.getProjects({ status: 'published' });
  const currentIndex = projects.findIndex(item => item.id === project.id);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined;

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/work" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> Back to all projects</Link>
          <div className={styles.heroCopy}>
            <div className={styles.kind}><Tag size={15} aria-hidden="true" /><span>{project.category}</span>{project.isConcept && <span className={styles.concept}>Concept study</span>}</div>
            <h1 className={styles.title}><TypewriterText lines={[project.title]} /></h1>
            <div className={styles.byline}>
              <span className={styles.bylineMark} aria-hidden="true"><Image src="/images/logo.webp" alt="" width={36} height={36} /></span>
              <div><strong>{project.isConcept ? 'Design1X concept project' : project.clientName}</strong><p>{project.category} <span aria-hidden="true">·</span> Published <time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time></p></div>
            </div>
          </div>
          <figure className={styles.cover}>
            <div className={styles.imageStage}><Image src={project.coverImage} alt={`${project.title} project preview`} fill priority quality={90} sizes="(max-width: 1280px) 100vw, 1280px" className={styles.coverImage} /></div>
            <figcaption className={styles.coverCaption}>{project.title} — overview{project.isConcept && <span> · Concept demonstration, not a commissioned client project.</span>}</figcaption>
          </figure>
        </header>

        <div className={styles.articleLayout}>
          <div className={styles.articleBody}>
            <section id="project-overview" className={styles.overview}>
              <p className={styles.lead}>{project.summary}</p>
              <Link href={enquiryHref} className={`${styles.enquiry} brand-gradient-button`}>Discuss a similar project <ArrowRight size={17} aria-hidden="true" /></Link>
            </section>
            <section id="project-brief" className={styles.storySection}>
              <p className={styles.sectionLabel}>The brief</p>
              <h2 className={styles.heading}>What the project set out to do.</h2>
              <p className={styles.body}>{project.businessNeed}</p>
            </section>
            {project.deliveredScope.length > 0 && <section id="project-scope" className={styles.storySection}>
              <p className={styles.sectionLabel}>Scope of work</p>
              <h2 className={styles.heading}>{project.isConcept ? 'What the concept includes.' : 'What we delivered.'}</h2>
              <ol className={styles.scope}>{project.deliveredScope.map((scope, index) => <li key={`${scope}-${index}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{scope}</li>)}</ol>
            </section>}
            {project.resultsSummary && <section id="project-outcome" className={styles.storySection}>
              <p className={styles.sectionLabel}>{project.isConcept ? 'Concept direction' : 'The outcome'}</p>
              <h2 className={styles.heading}>{project.isConcept ? 'The thinking behind it.' : 'How it came together.'}</h2>
              <p className={styles.body}>{project.resultsSummary}</p>
            </section>}
            <div className={styles.articleEnd}><span className={styles.endLabel}>Project</span><span className={styles.endTag}>{project.category}</span><Link href={enquiryHref} className={styles.endCta}>Start a project with us <ArrowRight size={17} aria-hidden="true" /></Link></div>
          </div>
          <aside className={styles.sidebar} aria-label="Project information and navigation">
            <div className={styles.sidebarCard}>
              <h2>Inside this project</h2>
              <dl className={styles.facts}>
                <div><dt>{project.isConcept ? 'Project for' : 'Client'}</dt><dd>{project.clientName}</dd></div>
                <div><dt>Discipline</dt><dd>{project.category}</dd></div>
                <div><dt><CalendarDays size={14} aria-hidden="true" /> Published</dt><dd><time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time></dd></div>
              </dl>
              <nav className={styles.contents} aria-label="Project sections">
                <a href="#project-overview">Project overview <ArrowUpRight size={15} aria-hidden="true" /></a>
                <a href="#project-brief">The brief <ArrowUpRight size={15} aria-hidden="true" /></a>
                {project.deliveredScope.length > 0 && <a href="#project-scope">Scope of work <ArrowUpRight size={15} aria-hidden="true" /></a>}
                {project.resultsSummary && <a href="#project-outcome">{project.isConcept ? 'Concept direction' : 'The outcome'} <ArrowUpRight size={15} aria-hidden="true" /></a>}
                {gallery.length > 0 && <a href="#project-gallery">Design details <ArrowUpRight size={15} aria-hidden="true" /></a>}
              </nav>
            </div>
            {nextProject && <Link href={`/work/${nextProject.slug}`} className={styles.nextCard}><span>Up next</span><strong>{nextProject.title}</strong><span className={styles.nextAction}>View project <ArrowUpRight size={15} aria-hidden="true" /></span></Link>}
          </aside>
        </div>

        {gallery.length > 0 && <section id="project-gallery" className={styles.gallery} aria-labelledby="gallery-heading">
          <div className={styles.galleryHeading}><h2 id="gallery-heading" className={styles.heading}>A closer look.</h2></div>
          <div className={styles.galleryGrid}>{gallery.map(media => <figure key={media.id}>
            <div className={styles.galleryImage}><Image src={media.url} alt={media.altText} fill sizes="(max-width: 767px) 100vw, 60vw" /></div>
            {media.altText && <figcaption>{media.altText}</figcaption>}
          </figure>)}</div>
        </section>}

        <nav className={styles.more} aria-label="More projects">
          <Link href="/work#projects" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
          {nextProject && <Link href={`/work/${nextProject.slug}`} className={styles.next}><div><p>Next project</p><strong>{nextProject.title}</strong></div><ArrowUpRight size={24} aria-hidden="true" /></Link>}
        </nav>

        <section className={styles.projectCta} aria-labelledby="project-cta-title">
          <div>
            <p className={styles.ctaEyebrow}>Build what comes next</p>
            <h2 id="project-cta-title">Have a project in mind?</h2>
            <p>Tell us what you are building. We will help shape a clear path from idea to launch.</p>
          </div>
          <Link href={enquiryHref} className={styles.ctaLink}>Discuss a similar project <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </section>
      </div>
    </article>
  );
}
