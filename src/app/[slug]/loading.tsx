// Skeleton loading state for the [slug] page
export default function SlugLoading() {
  return (
    <div className="min-h-screen bg-cyan-50" aria-busy="true" aria-label="Loading jobs…">
      {/* Header skeleton */}
      <div className="bg-white border-b border-cyan-100 h-16" />

      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="skeleton h-4 w-48 opacity-60" />
          <div className="skeleton h-10 w-80 max-w-full opacity-70" />
          <div className="skeleton h-6 w-96 max-w-full opacity-60" />
          <div className="skeleton h-8 w-56 rounded-full opacity-50" />
        </div>
      </div>

      {/* Job cards skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between mb-5">
          <div className="skeleton h-5 w-40" />
          <div className="skeleton h-4 w-24" />
        </div>
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="bg-white rounded-xl border border-cyan-100 p-5 sm:p-6 space-y-3">
              <div className="flex justify-between gap-4">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-16 shrink-0" />
              </div>
              <div className="skeleton h-4 w-40" />
              <div className="flex gap-2">
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-6 w-24 rounded-full" />
              </div>
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-9 w-28 rounded-lg" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
