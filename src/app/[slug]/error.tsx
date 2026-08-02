'use client'

import Link from 'next/link'

export default function SlugError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-red-500"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-heading font-700 text-cyan-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-cyan-600 font-body max-w-sm mb-6">
        We couldn&apos;t load the job listings right now. This might be a temporary issue.
        {error.digest && (
          <span className="block mt-1 text-xs text-cyan-400">Error ID: {error.digest}</span>
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-heading font-600 hover:bg-cyan-700 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-cyan-200 text-sm font-heading font-600 text-cyan-700 hover:bg-cyan-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
