import { MetadataRoute } from 'next'
import { getStaticPages } from '@/services/jobs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthcarejobs.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Homepage
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Dynamic profession/location pages
  let dynamicPages: MetadataRoute.Sitemap = []
  try {
    const pages = await getStaticPages()
    dynamicPages = pages.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    }))
  } catch {
    // DB not configured — return only static pages
  }

  return [...staticPages, ...dynamicPages]
}
