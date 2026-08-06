// services/jobs.ts
// ALL Prisma queries live here. Zero Prisma usage anywhere else.

import prisma from '@/lib/prisma'
import { generateSlug } from '@/lib/slug'
import type { Job, RelatedPage } from '@/types'

const PER_PAGE = 20

// ---------------------------------------------------------------------------
// Wildcard constants
// These values act as "match all" sentinels when passed as filter keys.
//   profession = 'healthcare'  → show ALL professions
//   location   = 'india'       → show ALL cities / locations
// ---------------------------------------------------------------------------
export const WILDCARD_PROFESSION = 'healthcare'
export const WILDCARD_LOCATION   = 'india'

/** Returns true when the profession represents the whole platform (no filter). */
export const isWildcardProfession = (p: string) =>
  p.toLowerCase() === WILDCARD_PROFESSION

/** Returns true when the location represents the whole country (no filter). */
export const isWildcardLocation = (l: string) =>
  l.toLowerCase() === WILDCARD_LOCATION

/**
 * Builds the Prisma `where` clause that respects wildcards.
 * Omits the field entirely when the wildcard is detected,
 * which tells Prisma to match every row for that field.
 */
function buildWhereClause(profession: string, location: string) {
  return {
    ...(!isWildcardProfession(profession) && {
      profession: { equals: profession, mode: 'insensitive' as const },
    }),
    ...(!isWildcardLocation(location) && {
      location: { equals: location, mode: 'insensitive' as const },
    }),
  }
}

// ---------------------------------------------------------------------------
// getJobs — Paginated list of jobs for a profession/location combination
// ---------------------------------------------------------------------------
export async function getJobs(
  profession: string,
  location: string,
  page: number = 1,
  perPage: number = PER_PAGE
): Promise<Job[]> {
  try {
    const skip = (page - 1) * perPage

    return await prisma.job.findMany({
      where: buildWhereClause(profession, location),
      orderBy: { postedDate: 'desc' },
      skip,
      take: perPage,
      select: {
        id: true,
        jobId: true,
        title: true,
        slug: true,
        profession: true,
        location: true,
        description: true,
        applyLink: true,
        company: true,
        category: true,
        postedDate: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.warn('[getJobs] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getJobCount — Total count for a profession/location (for pagination)
// ---------------------------------------------------------------------------
export async function getJobCount(profession: string, location: string): Promise<number> {
  try {
    return await prisma.job.count({
      where: buildWhereClause(profession, location),
    })
  } catch (error) {
    console.warn('[getJobCount] Failed to connect to database (expected if DATABASE_URL is missing)')
    return 0
  }
}

// ---------------------------------------------------------------------------
// getRelatedPages — SEO internal links: sibling pages for Related Jobs section
// Returns pages for the same profession in other cities, plus other professions.
// ---------------------------------------------------------------------------
export async function getRelatedPages(
  currentProfession: string,
  currentLocation: string
): Promise<RelatedPage[]> {
  try {
    // Get all unique profession+location combos that have jobs
    const raw = await prisma.job.groupBy({
      by: ['profession', 'location'],
      _count: { id: true },
      orderBy: [{ profession: 'asc' }, { location: 'asc' }],
      take: 60, // Cap to avoid excessive links
    })

    type GroupByRow = { profession: string; location: string; _count: { id: number } }
    return (raw as GroupByRow[])
      .filter(
        (r) => {
          // For wildcard pages, exclude rows that are also wildcards
          // to avoid generating recursive/circular related links.
          const sameProf =
            isWildcardProfession(currentProfession) ||
            r.profession.toLowerCase() === currentProfession.toLowerCase()
          const sameLoc =
            isWildcardLocation(currentLocation) ||
            r.location.toLowerCase() === currentLocation.toLowerCase()
          return !(sameProf && sameLoc)
        }
      )
      .map((r) => ({
        slug: generateSlug(r.profession, r.location),
        profession: r.profession,
        location: r.location,
        jobCount: r._count.id,
      }))
      .slice(0, 40) // Max 40 related links for clean UX
  } catch (error) {
    console.warn('[getRelatedPages] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getProfessions — Distinct list of all professions in the DB
// ---------------------------------------------------------------------------
export async function getProfessions(): Promise<string[]> {
  try {
    const rows = await prisma.job.findMany({
      select: { profession: true },
      distinct: ['profession'],
      orderBy: { profession: 'asc' },
    })
    return (rows as Array<{ profession: string }>).map((r) => r.profession)
  } catch (error) {
    console.warn('[getProfessions] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getCities — Distinct list of all locations/cities in the DB
// ---------------------------------------------------------------------------
export async function getCities(): Promise<string[]> {
  try {
    const rows = await prisma.job.findMany({
      select: { location: true },
      distinct: ['location'],
      orderBy: { location: 'asc' },
    })
    return (rows as Array<{ location: string }>).map((r) => r.location)
  } catch (error) {
    console.warn('[getCities] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getStaticPages — All unique profession/location pairs that have jobs.
// Used by generateStaticParams() to pre-render pages at build time.
// NEVER generates empty pages.
// ---------------------------------------------------------------------------
export async function getStaticPages(): Promise<
  Array<{ slug: string; profession: string; location: string }>
> {
  try {
    const raw = await prisma.job.groupBy({
      by: ['profession', 'location'],
      _count: { id: true },
      having: {
        id: { _count: { gt: 0 } },
      },
    })

    type GroupByRow = { profession: string; location: string; _count: { id: number } }
    return (raw as GroupByRow[]).map((r) => ({
      slug: generateSlug(r.profession, r.location),
      profession: r.profession,
      location: r.location,
    }))
  } catch (error) {
    console.warn('[getStaticPages] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getFeaturedProfessionLinks — For homepage: top professions with city combos
// ---------------------------------------------------------------------------
export async function getFeaturedProfessionLinks(): Promise<
  Array<{ profession: string; location: string; slug: string; count: number }>
> {
  try {
    const raw = await prisma.job.groupBy({
      by: ['profession', 'location'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    })

    type GroupByRow = { profession: string; location: string; _count: { id: number } }
    return (raw as GroupByRow[]).map((r) => ({
      profession: r.profession,
      location: r.location,
      slug: generateSlug(r.profession, r.location),
      count: r._count.id,
    }))
  } catch (error) {
    console.warn('[getFeaturedProfessionLinks] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getTopProfessions — Top N professions by total job count across all India.
// Location is treated as the WILDCARD_LOCATION ('india') so the slug links
// to /profession-jobs-in-india, showing all cities for that profession.
// Used on the homepage "Browse by Profession" section.
// ---------------------------------------------------------------------------
export async function getTopProfessions(limit = 6): Promise<
  Array<{ profession: string; count: number; slug: string }>
> {
  try {
    // Group by profession only (no location filter) to get nationwide totals
    const raw = await prisma.job.groupBy({
      by: ['profession'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    })

    type Row = { profession: string; _count: { id: number } }
    return (raw as Row[]).map((r) => ({
      profession: r.profession,
      count: r._count.id,
      // Links to /profession-jobs-in-india (wildcard location → all cities)
      slug: generateSlug(r.profession, WILDCARD_LOCATION),
    }))
  } catch (error) {
    console.warn('[getTopProfessions] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getTopCities — Top N locations by total job count (all professions).
// Ordered by job count descending so the most active cities appear first.
// Used on the homepage "Jobs by City" section.
// ---------------------------------------------------------------------------
export async function getTopCities(limit = 12): Promise<
  Array<{ location: string; count: number }>
> {
  try {
    const raw = await prisma.job.groupBy({
      by: ['location'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    })

    type Row = { location: string; _count: { id: number } }
    return (raw as Row[]).map((r) => ({
      location: r.location,
      count: r._count.id,
    }))
  } catch (error) {
    console.warn('[getTopCities] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}

// ---------------------------------------------------------------------------
// getLatestJobs — Most recently posted jobs across all professions & cities.
// Used on the homepage to surface fresh listings.
// ---------------------------------------------------------------------------
export async function getLatestJobs(limit = 4): Promise<Job[]> {
  try {
    return await prisma.job.findMany({
      orderBy: { postedDate: 'desc' },
      take: limit,
      select: {
        id: true,
        jobId: true,
        title: true,
        slug: true,
        profession: true,
        location: true,
        description: true,
        applyLink: true,
        company: true,
        category: true,
        postedDate: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.warn('[getLatestJobs] Failed to connect to database (expected if DATABASE_URL is missing)')
    return []
  }
}
