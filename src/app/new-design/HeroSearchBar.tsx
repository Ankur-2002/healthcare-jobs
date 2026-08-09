'use client';

import Link from 'next/link';
import { useState } from 'react';

// Inlined to avoid importing @/lib/slug which transitively pulls in
// @/services/jobs → @/lib/prisma → pg (Node-only, cannot run in browser bundle).
function makeSlug(profession: string, location: string): string {
  const p = profession.toLowerCase().trim().replace(/\s+/g, '-');
  const l = location.toLowerCase().trim().replace(/\s+/g, '-');
  return `${p}-jobs-in-${l}`;
}

const POPULAR_TAGS = [
  'Nursing Jobs',
  'Doctor Jobs',
  'Pharmacist Jobs',
  'Medical Coding Jobs',
  'Lab Technician Jobs',
];

export default function HeroSearchBar({
  topProfession,
}: {
  topProfession: {
    name: string;
    count: number;
    slug: string;
  }[];
}) {
  const [jobQuery, setJobQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');

  const searchHref =
    jobQuery || cityQuery
      ? `/${makeSlug(jobQuery || 'healthcare', cityQuery || 'india')}`
      : '/healthcare-jobs-in-india';

  return (
    <>
      {/* ── Search bar ──────────────────────────────────────────── */}
      <div
        role="search"
        aria-label="Search healthcare jobs"
        className="flex max-w-[620px] rounded-xl overflow-hidden shadow-2xl bg-white"
      >
        {/* Job field */}
        <div className="flex items-center flex-1 px-4 border-r border-slate-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-[18px] h-[18px] text-slate-400 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <label htmlFor="nd-search-job" className="sr-only">
            Job title, profession or keyword
          </label>
          <input
            id="nd-search-job"
            type="text"
            placeholder="e.g. Nurse, Doctor, Pharmacist"
            value={jobQuery}
            onChange={e => setJobQuery(e.target.value)}
            className="flex-1 min-w-0 border-none outline-none py-3.5 px-3 text-sm text-slate-800 bg-transparent font-body placeholder:text-slate-400"
          />
        </div>

        {/* City field */}
        <div className="flex items-center flex-1 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-[18px] h-[18px] text-slate-400 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              clipRule="evenodd"
            />
          </svg>
          <label htmlFor="nd-search-city" className="sr-only">
            City or location
          </label>
          <input
            id="nd-search-city"
            type="text"
            placeholder="e.g. Bengaluru, Hyderabad"
            value={cityQuery}
            onChange={e => setCityQuery(e.target.value)}
            className="flex-1 min-w-0 border-none outline-none py-3.5 px-3 text-sm text-slate-800 bg-transparent font-body placeholder:text-slate-400"
          />
        </div>

        {/* Submit */}
        <Link
          href={searchHref}
          id="nd-search-submit"
          className="shrink-0 flex items-center px-6 bg-sky-700 hover:bg-sky-600 text-white text-sm font-bold no-underline transition-colors duration-200 whitespace-nowrap"
        >
          Search Jobs
        </Link>
      </div>

      {/* ── Popular search tags ──────────────────────────────────── */}
      <div
        className="mt-4 flex flex-wrap items-center gap-3 text-white"
        style={{}}
      >
        <span className=" text-xs font-semibold">Popular Searches:</span>
        {topProfession?.slice(0, 5).map(tag => (
          <Link
            key={tag.name}
            href={`/${tag.slug}`}
            className="text-xs  underline underline-offset-2 hover:text-sky-100 transition-colors duration-150"
            style={{
              alignContent: 'center',
            }}
          >
            {tag.name + ' Jobs'}
          </Link>
        ))}
      </div>
    </>
  );
}
