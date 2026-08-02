interface LandingContentProps {
  profession: string   // display name, e.g. "Nurse"
  location: string     // display name, e.g. "Delhi"
  jobCount: number
}

export default function LandingContent({ profession, location, jobCount }: LandingContentProps) {
  return (
    <section
      className="bg-gradient-to-br from-cyan-600 to-cyan-800 text-white py-12 sm:py-16"
      aria-labelledby="page-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-cyan-200 font-body">
            <li>
              <a href="/" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">
                Home
              </a>
            </li>
            <li aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-cyan-400">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-cyan-200">{profession} Jobs</span>
            </li>
            <li aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-cyan-400">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-white font-medium" aria-current="page">
                {profession} Jobs in {location}
              </span>
            </li>
          </ol>
        </nav>

        {/* H1 */}
        <h1
          id="page-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-heading font-700 text-white leading-tight mb-4"
        >
          {profession} Jobs in {location}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-cyan-100 max-w-2xl leading-relaxed mb-6">
          Browse the latest <strong className="text-white">{profession}</strong> jobs in{' '}
          <strong className="text-white">{location}</strong>. Apply directly to hospitals, clinics
          and healthcare organizations hiring experienced and fresher professionals.
        </p>

        {/* Stats badge */}
        {jobCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-heading font-600 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-300" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            {jobCount.toLocaleString('en-IN')} Active {profession} Jobs in {location}
          </div>
        )}
      </div>
    </section>
  )
}
