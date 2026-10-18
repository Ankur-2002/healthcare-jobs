import { MetadataRoute } from 'next';
import { getStaticPages } from '@/services/jobs';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.healthhirehub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const pages = await getStaticPages();
    return pages
      .filter(page => page.slug)
      .map(page => ({
        url: `${SITE_URL}/${page.slug}`.replace(/&/g, '&amp;'),
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.8,
      }));
  } catch {
    return [];
  }
}
