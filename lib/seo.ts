import type { Metadata } from 'next';

export const siteUrl = 'https://www.design1x.com';

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function pageMetadata({ title, description, path, image = '/images/logo.png', type = 'website' }: PageMetadata): Metadata {
  const url = `${siteUrl}${path}`;
  const brandedTitle = `${title} | Design1X`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: 'en_US',
      url,
      title: brandedTitle,
      description,
      siteName: 'Design1X',
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary',
      title: brandedTitle,
      description,
      images: [image],
    },
  };
}
