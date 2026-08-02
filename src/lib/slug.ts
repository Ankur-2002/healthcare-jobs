// lib/slug.ts
// SINGLE SOURCE OF TRUTH for all slug parsing and generation.
// No slug logic should exist anywhere else in the codebase.

/**
 * Parses a URL slug like "nurse-jobs-in-delhi" into profession + location.
 * Returns null if the slug does not match the expected pattern.
 *
 * Pattern: {profession-kebab}-jobs-in-{location-kebab}
 * Examples:
 *   "nurse-jobs-in-delhi"          → { profession: "nurse", location: "delhi" }
 *   "lab-technician-jobs-in-pune"  → { profession: "lab-technician", location: "pune" }
 */
export function parseSlug(slug: string): { profession: string; location: string } | null {
  const match = slug.match(/^(.+)-jobs-in-(.+)$/)
  if (!match) return null

  const [, professionRaw, locationRaw] = match
  if (!professionRaw || !locationRaw) return null

  return {
    profession: professionRaw.toLowerCase(),
    location: locationRaw.toLowerCase(),
  }
}

/**
 * Generates a canonical URL slug from profession and location strings.
 * Handles multi-word professions/locations correctly.
 *
 * Examples:
 *   ("Nurse", "Delhi")         → "nurse-jobs-in-delhi"
 *   ("Lab Technician", "Pune") → "lab-technician-jobs-in-pune"
 *   ("Medical Coder", "Noida") → "medical-coder-jobs-in-noida"
 */
export function generateSlug(profession: string, location: string): string {
  const professionSlug = profession.toLowerCase().trim().replace(/\s+/g, '-')
  const locationSlug = location.toLowerCase().trim().replace(/\s+/g, '-')
  return `${professionSlug}-jobs-in-${locationSlug}`
}

/**
 * Converts a kebab-case or lowercase string to Title Case for display.
 *
 * Examples:
 *   "nurse"           → "Nurse"
 *   "lab-technician"  → "Lab Technician"
 *   "medical coder"   → "Medical Coder"
 */
export function toTitleCase(str: string): string {
  return str
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}
