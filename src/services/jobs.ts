// services/jobs.ts
// ALL Prisma queries live here. Zero Prisma usage anywhere else.

import prisma from '@/lib/prisma'
import { generateSlug } from '@/lib/slug'
import type { Job, RelatedPage } from '@/types'

const PER_PAGE = 20

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
      where: {
        profession: { equals: profession, mode: 'insensitive' },
        location: { equals: location, mode: 'insensitive' },
      },
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
      where: {
        profession: { equals: profession, mode: 'insensitive' },
        location: { equals: location, mode: 'insensitive' },
      },
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
        (r) =>
          !(
            r.profession.toLowerCase() === currentProfession.toLowerCase() &&
            r.location.toLowerCase() === currentLocation.toLowerCase()
          )
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
