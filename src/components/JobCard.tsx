import type { Job } from '@/types'

interface JobCardProps {
  job: Job
}

function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

function truncateDescription(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

export default function JobCard({ job }: JobCardProps) {
  const relativeDate = formatRelativeDate(job.postedDate)
  const shortDescription = truncateDescription(job.description)

  return (
    <article
      className="group bg-white rounded-xl border border-cyan-100 p-5 sm:p-6 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200 cursor-default animate-fade-in-up"
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className="flex flex-col gap-3">
        {/* Header row: title + date */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base sm:text-lg font-heading font-600 text-cyan-900 leading-snug group-hover:text-cyan-700 transition-colors duration-200">
            {job.title}
          </h2>
          <time
            dateTime={new Date(job.postedDate).toISOString()}
            className="shrink-0 text-xs text-cyan-500 font-body whitespace-nowrap mt-0.5"
          >
            {relativeDate}
          </time>
        </div>

        {/* Company */}
        <div className="flex items-center gap-1.5 text-sm text-cyan-700 font-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-cyan-400 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zm2.5-3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{job.company}</span>
        </div>

        {/* Tags: Location + Category */}
        <div className="flex flex-wrap gap-2" role="list" aria-label="Job details">
          <span
            role="listitem"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-body text-cyan-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3 text-cyan-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                clipRule="evenodd"
              />
            </svg>
            {job.location}
          </span>
          <span
            role="listitem"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-body text-emerald-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3 text-emerald-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
                clipRule="evenodd"
              />
            </svg>
            {job.category}
          </span>
        </div>

        {/* Short description */}
        <p className="text-sm text-cyan-700 font-body leading-relaxed">{shortDescription}</p>

        {/* Apply button */}
        <div className="pt-1">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`apply-btn-${job.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-heading font-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            aria-label={`Apply for ${job.title} at ${job.company}`}
          >
            Apply Now
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
  )
}
