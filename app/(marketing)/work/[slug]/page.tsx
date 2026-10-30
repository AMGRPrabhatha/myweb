import HeroTicker from '@/components/HeroTicker';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
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
          <Link href="/work" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
          <div className={styles.intro}>
            <div>
              <p className={styles.kind}><span>{project.category}</span>{project.isConcept && <span className={styles.concept}>Concept study</span>}</p>
              <h1 className={styles.title}>{project.title}</h1>
            </div>
            <div>
              <p className={styles.summary}>{project.summary}</p>
              <Link href={enquiryHref} className={`${styles.enquiry} brand-gradient-button`}>Discuss a similar project<span className={styles.circle}><ArrowRight size={17} aria-hidden="true" /></span></Link>
            </div>
          </div>
          <dl className={styles.facts}>
            <div><dt>{project.isConcept ? 'Project for' : 'Client'}</dt><dd>{project.clientName}</dd></div>
            <div><dt>Discipline</dt><dd>{project.category}</dd></div>
            <div><dt>Published</dt><dd><time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time></dd></div>
          </dl>
        </header>

        <figure className={styles.cover}>
          <div className={styles.imageStage}>
            <Image src={project.coverImage} alt={`${project.title} project preview`} width={1200} height={800} priority sizes="(max-width: 767px) 100vw, 900px" className={styles.coverImage} />
          </div>
          <figcaption className={styles.coverCaption}><span>{project.title} — overview</span>{project.isConcept && <span>Concept demonstration, not a commissioned client project.</span>}</figcaption>
        </figure>

        <HeroTicker fullBleed />

        <div className={styles.story}>
          <nav className={styles.contents} aria-label="Project sections">
            <p>Inside the project</p>
            <a href="#project-brief">The brief</a>
            {project.deliveredScope.length > 0 && <a href="#project-scope">Scope of work</a>}
            {project.resultsSummary && <a href="#project-outcome">{project.isConcept ? 'Concept direction' : 'The outcome'}</a>}
            {gallery.length > 0 && <a href="#project-gallery">Design details</a>}
          </nav>
          <div>
            <section id="project-brief" className={styles.storySection}>
              <p className={styles.sectionLabel}>The brief</p>
              <h2 className={styles.heading}>What the project set out to do.</h2>
              <p className={styles.body}>{project.businessNeed}</p>
            </section>
            {project.deliveredScope.length > 0 && <section id="project-scope" className={styles.storySection}>
              <p className={styles.sectionLabel}>Scope of work</p>
              <h2 className={styles.heading}>{project.isConcept ? 'What the concept includes.' : 'What we delivered.'}</h2>
              <ul className={styles.scope}>{project.deliveredScope.map((scope, index) => <li key={`${scope}-${index}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{scope}</li>)}</ul>
            </section>}
            {project.resultsSummary && <section id="project-outcome" className={styles.storySection}>
              <p className={styles.sectionLabel}>{project.isConcept ? 'Concept direction' : 'The outcome'}</p>
              <h2 className={styles.heading}>{project.isConcept ? 'The thinking behind it.' : 'How it came together.'}</h2>
              <p className={styles.body}>{project.resultsSummary}</p>
            </section>}
          </div>
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
      </div>
    </article>
  );
}
