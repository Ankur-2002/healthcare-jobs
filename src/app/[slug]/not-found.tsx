import Link from 'next/link'

export default function SlugNotFound() {
  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-100 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-cyan-500"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-heading font-700 text-cyan-900 mb-3">
        No Jobs Found
      </h1>
      <p className="text-base text-cyan-600 font-body max-w-md mb-2">
        We don&apos;t have any listings for this combination right now.
      </p>
      <p className="text-sm text-cyan-500 font-body max-w-sm mb-8">
        New positions are posted daily. Try browsing related categories below or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-heading font-600 hover:bg-cyan-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
          </svg>
          Browse All Jobs
        </Link>
      </div>
    </div>
  )
}
