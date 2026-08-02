import JobCard from '@/components/JobCard'
import type { Job } from '@/types'

interface JobListProps {
  jobs: Job[]
  profession: string
  location: string
}

export default function JobList({ jobs, profession, location }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div
        className="text-center py-16 px-4"
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-cyan-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-600 text-cyan-800 mb-2">
          No {profession} jobs in {location} right now
        </h3>
        <p className="text-sm text-cyan-600 font-body max-w-sm mx-auto">
          New positions are added daily. Check back soon or browse related jobs below.
        </p>
      </div>
    )
  }

  return (
    <section aria-label={`${profession} jobs in ${location}`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-heading font-600 text-cyan-900">
          Available Positions
        </h2>
        <span className="text-sm text-cyan-500 font-body">
          Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''}
        </span>
      </div>

      <ul className="space-y-4" role="list" aria-label="Job listings">
        {jobs.map((job) => (
          <li key={job.id} role="listitem">
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  )
}
