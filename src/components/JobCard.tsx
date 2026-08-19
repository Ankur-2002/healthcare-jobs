import type { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

export default function JobCard({ job }: JobCardProps) {
  const relativeDate = formatRelativeDate(job.postedDate);
  const shortDescription = truncateDescription(job.description);

  return (
    <article
      className="group bg-white rounded-xl border border-slate-200 p-5 sm:p-6 hover:bg-slate-50 transition-colors duration-150 cursor-default
      
      hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200 cursor-default animate-fade-in-up"
      aria-label={`${job.title} at ${job.company}`}
    >
      {/* Outer row: left content | right actions */}
      <div className="flex items-start justify-between gap-6">
        {/* ── Left column ─────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          {/* Category pill */}
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {job.category}
            </span>
          </div>

          {/* Job title */}
          <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors duration-150 truncate">
            {job.title}
          </h2>

          {/* Employer name */}
          <p className="text-sm font-semibold text-slate-700 font-body">
            {job.company}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-slate-500 font-body">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{job.location}</span>
          </div>

          {/* Short description */}
          <p className="text-sm text-slate-500 font-body leading-relaxed mt-0.5">
            {shortDescription}
          </p>
        </div>

        {/* ── Right column ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-end justify-between gap-4 shrink-0 self-stretch">
          {/* Posted date */}
          <time
            dateTime={new Date(job.postedDate).toISOString()}
            className="text-xs text-slate-400 font-body whitespace-nowrap"
          >
            Posted {relativeDate}
          </time>

          {/* View Job button */}
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`view-job-btn-${job.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 text-sm font-semibold font-body hover:bg-emerald-50 hover:border-emerald-600 active:bg-emerald-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 whitespace-nowrap"
            aria-label={`View job: ${job.title} at ${job.company}`}
          >
            View Job
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
          </a>
        </div>
      </div>
    </article>
  );
}
