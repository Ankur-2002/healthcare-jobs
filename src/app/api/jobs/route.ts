// src/app/api/jobs/route.ts
// POST — saves a new job submitted via the "Post a Job" modal.
// Mirrors the slug logic from the Python scraper exactly.

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// ── Slug generation (matches Python scraper logic exactly) ─────────────────
function generateSlug(profession: string, location: string): string {
  const professionSlug = profession.toLowerCase().trim().replace(/\s+/g, '-')
  const locationSlug   = location.toLowerCase().trim().replace(/\s+/g, '-')
  const slug = `${professionSlug}-jobs-in-${locationSlug}`
  return slug.slice(0, 255)
}

// ── Unique job ID generator ────────────────────────────────────────────────
function generateJobId(profession: string, location: string): string {
  const timestamp = Date.now()
  const profPart  = profession.slice(0, 3).toUpperCase().replace(/\s+/g, '')
  const locPart   = location.slice(0, 3).toUpperCase().replace(/\s+/g, '')
  return `HJP-${profPart}-${locPart}-${timestamp}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      jobTitle,
      company,
      location,    // city string e.g. "Delhi"
      profession,  // e.g. "Nurse"
      category,    // e.g. "Full Time"
      description,
      applyLink,
      postedDate,
    } = body

    // ── Validation ──────────────────────────────────────────────────────────
    if (!jobTitle || !company || !location || !profession || !category || !description || !applyLink) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (description.length < 50) {
      return NextResponse.json(
        { error: 'Description must be at least 50 characters' },
        { status: 400 }
      )
    }

    if (!/^https?:\/\//.test(applyLink)) {
      return NextResponse.json(
        { error: 'Apply link must start with http:// or https://' },
        { status: 400 }
      )
    }

    // ── Slug + ID generation (mirrors Python scraper) ───────────────────────
    const professionNorm = profession.trim().toLowerCase()
    const locationNorm   = location.trim().toLowerCase()

    const slug  = generateSlug(professionNorm, locationNorm)
    const jobId = generateJobId(professionNorm, locationNorm)

    // ── Persist via Prisma ──────────────────────────────────────────────────
    const job = await prisma.job.create({
      data: {
        jobId,
        title:       jobTitle.trim(),
        slug,
        profession:  profession.trim(),
        location:    locationNorm,
        description: description.trim(),
        applyLink:   applyLink.trim(),
        company:     company.trim(),
        category:    category.trim(),
        postedDate:  postedDate ? new Date(postedDate) : new Date(),
      },
    })

    return NextResponse.json({ success: true, jobId: job.jobId }, { status: 201 })
  } catch (error: unknown) {
    console.error('[POST /api/jobs] Error:', error)

    // Handle unique constraint violation (duplicate jobId — extremely rare)
    if (
      error instanceof Error &&
      error.message.includes('Unique constraint failed')
    ) {
      return NextResponse.json(
        { error: 'A job with this ID already exists. Please try again.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save job. Please try again.' },
      { status: 500 }
    )
  }
}
