interface LandingContentProps {
  profession: string; // display name, e.g. "Nurse"
  location: string; // display name, e.g. "Delhi"
  jobCount: number;
}

export default function LandingContent({
  profession,
  location,
  jobCount,
}: LandingContentProps) {
  return (
    <section
      className="relative overflow-hidden text-white py-12 sm:py-16"
      style={{
        background:
          'linear-gradient(135deg,#0a2540 0%,#0d3460 40%,#1a4d80 70%,#0f3d6e 100%)',
      }}
      aria-labelledby="page-heading"
    >
      {/* Glow overlay – matches new-design hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%,rgba(14,165,233,.12) 0%,transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-sky-300 font-body">
            <li>
              <a
                href="/"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
              >
                Home
              </a>
            </li>
            <li aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 text-sky-500"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-sky-300">{profession} Jobs</span>
            </li>
            <li aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 text-sky-500"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
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
          className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight mb-4"
        >
          {profession} Jobs in {location}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-sky-200 max-w-2xl leading-relaxed mb-6">
          Explore the latest <strong className="text-white">{profession}</strong>{' '}
          jobs in <strong className="text-white">{location}</strong>. Find
          opportunities across hospitals, clinics, diagnostic centres and
          healthcare organisations that match your experience, skills and career
          goals.
        </p>

        {/* Stats badge – green pill matching new-design "India's Trusted" badge */}
        {jobCount > 0 && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-green-300"
            style={{
              background: 'rgba(34,197,94,.15)',
              border: '1px solid rgba(34,197,94,.3)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400 shrink-0"
              aria-hidden="true"
            />
            {jobCount.toLocaleString('en-IN')} Active {profession} Jobs in{' '}
            {location}
          </div>
        )}
      </div>
    </section>
  );
}
