import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found | HealthcareJobs',
  description:
    'Sorry, the page you were looking for could not be found. Browse all healthcare job listings or return to the homepage.',
};

const quickLinks = [
  { label: 'Nursing Jobs', href: '/nursing-jobs' },
  { label: 'Doctor Jobs', href: '/doctor-jobs' },
  { label: 'Pharmacy Jobs', href: '/pharmacy-jobs' },
  { label: 'Allied Health', href: '/allied-health-jobs' },
];

export default function SlugNotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg,#0a2540 0%,#0d3460 40%,#1a4d80 70%,#0f3d6e 100%)',
      }}
    >
      {/* Glow overlay — matches hero section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%,rgba(14,165,233,.12) 0%,transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full animate-fade-in-up">
        {/* Large 404 numeral */}
        <p
          aria-hidden="true"
          className="font-heading font-bold select-none leading-none mb-4 text-white/10"
          style={{ fontSize: 'clamp(7rem, 22vw, 12rem)' }}
        >
          404
        </p>

        {/* CTA buttons — styled after PostJobCtaButton */}
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Primary: white bg / emerald text — matches PostJobCtaButton color="white" */}
          <Link
            href="/"
            id="not-found-browse-all"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-heading font-semibold bg-white text-emerald-700 hover:bg-white/90 transition-colors duration-150 shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
            Go To Home
          </Link>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="w-full max-w-xs h-px my-10"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      </div>
    </main>
  );
}
