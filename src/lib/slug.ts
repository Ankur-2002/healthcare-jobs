// lib/slug.ts
// SINGLE SOURCE OF TRUTH for all slug parsing and generation.
// No slug logic should exist anywhere else in the codebase.

import { WILDCARD_PROFESSION, WILDCARD_LOCATION } from '@/services/jobs';

/**
 * Parses a URL slug like "nurse-jobs-in-delhi" into profession + location.
 * Returns null if the slug does not match the expected pattern.
 *
 * Pattern: {profession-kebab}-jobs-in-{location-kebab}
 * Examples:
 *   "nurse-jobs-in-delhi"           → { profession: "nurse", location: "delhi" }
 *   "lab-technician-jobs-in-pune"   → { profession: "lab-technician", location: "pune" }
 *   "healthcare-jobs-in-india"      → { profession: "healthcare", location: "india" } (all jobs)
 *   "healthcare-jobs-in-delhi"      → { profession: "healthcare", location: "delhi" } (all professions, one city)
 *   "nurse-jobs-in-india"           → { profession: "nurse", location: "india" } (one profession, all cities)
 */
export function parseSlug(
  slug: string,
): { profession: string; location: string } | null {
  const match = slug.match(/^(.+)-jobs-in-(.+)$/);
  if (!match) return null;

  const [, professionRaw, locationRaw] = match;
  if (!professionRaw || !locationRaw) return null;

  return {
    profession: professionRaw.toLowerCase(),
    location: locationRaw.toLowerCase(),
  };
}

/**
 * Generates a canonical URL slug from profession and location strings.
 * Handles multi-word professions/locations correctly.
 *
 * Examples:
 *   ("Nurse", "Delhi")         → "nurse-jobs-in-delhi"
 *   ("Lab Technician", "Pune") → "lab-technician-jobs-in-pune"
 *   ("Medical Coder", "Noida") → "medical-coder-jobs-in-noida"
 *   ("healthcare", "india")    → "healthcare-jobs-in-india"  (all jobs)
 */
export function generateSlug(profession: string, location: string): string {
  const professionSlug = profession.toLowerCase().trim().replace(/\s+/g, '-');
  const locationSlug = location.toLowerCase().trim().replace(/\s+/g, '-');
  return `${professionSlug}-jobs-in-${locationSlug}`;
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
    .replace(
      /\w\S*/g,
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );
}

/**
 * Returns a user-friendly display name for the profession.
 * When the profession is the wildcard ("healthcare"), returns "All Healthcare"
 * to make page headings like "All Healthcare Jobs in Delhi" meaningful.
 */
export function professionDisplayName(profession: string): string {
  if (profession.toLowerCase() === WILDCARD_PROFESSION) return 'All Healthcare';
  return toTitleCase(profession);
}

/**
 * Returns a user-friendly display name for the location.
 * When the location is the wildcard ("india"), returns "Across India"
 * to make page headings like "Nurse Jobs Across India" meaningful.
 */
export function locationDisplayName(location: string): string {
  if (location.toLowerCase() === WILDCARD_LOCATION) return 'India';
  return toTitleCase(location);
}
