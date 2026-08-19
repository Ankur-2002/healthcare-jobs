import Link from 'next/link';
import { toTitleCase, generateSlug } from '@/lib/slug';
import { WILDCARD_PROFESSION } from '@/services/jobs';

interface ProfessionEntry {
  profession: string;
  count: number;
  slug: string;
}

interface CityProfessionsProps {
  location: string;         // raw slug value, e.g. "delhi"
  locationDisplay: string;  // e.g. "Delhi"
  professions: ProfessionEntry[];
}

export default function CityProfessions({
  location,
  locationDisplay,
  professions,
}: CityProfessionsProps) {
  if (professions.length === 0) return null;

  // "View all professions" links to healthcare-jobs-in-{location} (wildcard profession)
  const viewAllSlug = generateSlug(WILDCARD_PROFESSION, location);

  return (
    <aside
      aria-labelledby="city-professions-heading"
      className="mt-10 pt-8 border-t border-slate-200"
    >
      {/* Section heading */}
      <h2
        id="city-professions-heading"
        className="text-lg sm:text-xl font-heading font-bold text-slate-900 mb-5"
      >
        Other Healthcare Jobs in {locationDisplay}
      </h2>

      {/* 4-column grid of profession cards — same style as ProfessionCities */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        role="list"
        aria-label={`Other healthcare professions in ${locationDisplay}`}
      >
        {professions.map(p => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            role="listitem"
            className="group block rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <p className="text-sm font-semibold text-indigo-900 leading-snug group-hover:text-indigo-700 transition-colors duration-150">
              {toTitleCase(p.profession)} Jobs
              <br />
              in {locationDisplay}
            </p>
            <p className="mt-2 text-sm font-semibold text-emerald-600">
              {p.count.toLocaleString('en-IN')} jobs
            </p>
          </Link>
        ))}
      </div>

      {/* View all professions CTA */}
      <div className="mt-5 text-center">
        <Link
          href={`/${viewAllSlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          View all professions
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
