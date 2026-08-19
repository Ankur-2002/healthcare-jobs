'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import JobCard from '@/components/JobCard';
import type { Job } from '@/types';

interface JobListProps {
  jobs: Job[];
  profession: string;
  location: string;
  total: number;
  sort: 'newest' | 'oldest';
}

export default function JobList({
  jobs,
  profession,
  location,
  total,
  sort,
}: JobListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page'); // reset to page 1 on sort change
    router.push(`${pathname}?${params.toString()}`);
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 px-4" role="status" aria-live="polite">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ background: 'rgba(14,165,233,.12)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-sky-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-slate-800 mb-2">
          No {profession} jobs in {location} right now
        </h3>
        <p className="text-sm text-slate-500 font-body max-w-sm mx-auto">
          New positions are added daily. Check back soon or browse related jobs
          below.
        </p>
      </div>
    );
  }

  // ── Job list ───────────────────────────────────────────────────────────────
  return (
    <section aria-labelledby="job-list-heading">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 pb-5 border-b border-slate-200">
        {/* Left: title + subtitle */}
        <div>
          <h2
            id="job-list-heading"
            className="text-xl sm:text-2xl font-heading font-bold text-slate-900 leading-tight"
          >
            Latest {profession} Jobs in {location}
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-body">
            Browse current {profession} vacancies in {location}. Compare
            opportunities by employer and role to find jobs that match your
            career goals.
          </p>
        </div>

        {/* Right: Sort dropdown */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <label
            htmlFor="sort-select"
            className="text-sm font-medium text-slate-600 whitespace-nowrap"
          >
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sort}
              onChange={e => handleSortChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-150 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            {/* Chevron icon */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <ul className="space-y-4" role="list" aria-label="Job listings">
        {jobs.map(job => (
          <li key={job.id} role="listitem">
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  );
}
