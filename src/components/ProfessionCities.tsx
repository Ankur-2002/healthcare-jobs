import Link from 'next/link';
import { toTitleCase, generateSlug } from '@/lib/slug';
import { WILDCARD_LOCATION } from '@/services/jobs';

interface CityEntry {
  location: string;
  count: number;
  slug: string;
}

interface ProfessionCitiesProps {
  profession: string          // raw slug value, e.g. "nurse"
  professionDisplay: string   // e.g. "Nurse"
  cities: CityEntry[]
}

export default function ProfessionCities({
  profession,
  professionDisplay,
  cities,
}: ProfessionCitiesProps) {
  if (cities.length === 0) return null;

  // "View all cities" links to profession-jobs-in-india (wildcard location)
  const viewAllSlug = generateSlug(profession, WILDCARD_LOCATION);

  return (
    <aside
      aria-labelledby="profession-cities-heading"
      className="mt-10 pt-8 border-t border-slate-200"
    >
      {/* Section heading */}
      <h2
        id="profession-cities-heading"
        className="text-lg sm:text-xl font-heading font-bold text-slate-900 mb-5"
      >
        {professionDisplay} Jobs in Other Cities
      </h2>

      {/* 4-column grid of city cards */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        role="list"
        aria-label={`Cities with ${professionDisplay} jobs`}
      >
        {cities.map(city => (
          <Link
            key={city.slug}
            href={`/${city.slug}`}
            role="listitem"
            className="group block rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <p className="text-sm font-semibold text-indigo-900 leading-snug group-hover:text-indigo-700 transition-colors duration-150">
              {professionDisplay} Jobs
              <br />
              in {toTitleCase(city.location)}
            </p>
            <p className="mt-2 text-sm font-semibold text-emerald-600">
              {city.count.toLocaleString('en-IN')} jobs
            </p>
          </Link>
        ))}
      </div>

      {/* View all cities CTA */}
      <div className="mt-5 text-center">
        <Link
          href={`/${viewAllSlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          View all cities
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
