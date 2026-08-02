// lib/metadata.ts
// Centralizes all SEO metadata generation. Import from here only.

import type { Metadata } from 'next'
import { toTitleCase } from '@/lib/slug'
import type { Job } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthcarejobs.in'
const SITE_NAME = 'HealthcareJobs'

// ---------------------------------------------------------------------------
// generatePageMetadata — Full Next.js Metadata for a profession/location page
// ---------------------------------------------------------------------------
export function generatePageMetadata(
  professionSlug: string,
  locationSlug: string
): Metadata {
  const profession = toTitleCase(professionSlug)
  const location = toTitleCase(locationSlug)
  const slug = `${professionSlug}-jobs-in-${locationSlug}`
  const canonicalUrl = `${SITE_URL}/${slug}`

  const title = `${profession} Jobs in ${location} | Latest Healthcare Jobs 2025`
  const description = `Find the latest ${profession} jobs in ${location}. Apply directly to hospitals, clinics and healthcare companies hiring experienced and fresher professionals. Updated daily.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// ---------------------------------------------------------------------------
// generateBreadcrumbJsonLd — BreadcrumbList schema for rich results
// ---------------------------------------------------------------------------
export function generateBreadcrumbJsonLd(
  profession: string,
  location: string,
  slug: string
): object {
  const professionDisplay = toTitleCase(profession)
  const locationDisplay = toTitleCase(location)
  const professionSlug = `${profession}-jobs-in-${location}`.split('-in-')[0] + '-jobs'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${professionDisplay} Jobs`,
        item: `${SITE_URL}/search?profession=${encodeURIComponent(professionDisplay)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${professionDisplay} Jobs in ${locationDisplay}`,
        item: `${SITE_URL}/${slug}`,
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// generateJobPostingsJsonLd — JobPosting schema for all jobs on the page
// ---------------------------------------------------------------------------
export function generateJobPostingsJsonLd(jobs: Job[]): object[] {
  return jobs.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.company,
      value: job.jobId,
    },
    datePosted: job.postedDate.toISOString(),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'IN',
      },
    },
    employmentType: job.category?.toUpperCase().replace(/\s+/g, '_') ?? 'FULL_TIME',
    url: job.applyLink,
    directApply: true,
  }))
}

// ---------------------------------------------------------------------------
// generateSiteMetadata — Default metadata for root layout
// ---------------------------------------------------------------------------
export function generateSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Find Healthcare Jobs in India`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      'Discover the latest healthcare jobs in India. Nurse, Doctor, Pharmacist, Lab Technician and Medical Coder jobs across top cities. Apply today.',
    keywords: [
      'healthcare jobs',
      'nurse jobs India',
      'doctor jobs',
      'hospital jobs',
      'medical jobs India',
      'healthcare career',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Find Healthcare Jobs in India`,
      description:
        'Discover the latest healthcare jobs in India. Nurse, Doctor, Pharmacist, Lab Technician and Medical Coder jobs across top cities.',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} | Find Healthcare Jobs in India`,
      description: 'Discover the latest healthcare jobs across top Indian cities.',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
