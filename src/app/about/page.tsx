import type { Metadata } from 'next';
import NewDesignHeader from '@/app/new-design/NewDesignHeader';
import NewDesignFooter from '@/app/new-design/NewDesignFooter';
import Link from 'next/link';
import PostJobButton from '@/components/PostJobButton';

export const metadata: Metadata = {
  title: 'About Us | Health Hire Hub',
  description:
    "Learn about Health Hire Hub — India's dedicated healthcare job platform connecting doctors, nurses, pharmacists and other healthcare professionals with the right opportunities.",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const WHAT_WE_DO = [
  'Bring healthcare job opportunities together in one platform',
  'Help candidates search jobs by profession and location',
  'Connect employers with healthcare professionals',
  'Share useful career resources and job search guidance',
  'Support a safer and more transparent job search experience',
];

const STATS = [
  { value: 'Pan-India', label: 'Coverage' },
  { value: 'Multiple', label: 'Professions Supported' },
  { value: 'Free', label: 'For Job Seekers' },
  { value: '24 / 7', label: 'Listings Updated' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="text-white pt-16 pb-20 px-6"
          aria-labelledby="about-hero-heading"
          style={{
            background:
              'linear-gradient(135deg,#0a2540 0%,#0d3460 40%,#1a4d80 70%,#0f3d6e 100%)',
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-green-300 mb-5"
              style={{
                background: 'rgba(34,197,94,.15)',
                border: '1px solid rgba(34,197,94,.3)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              About Us
            </div>
            <h1
              id="about-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight text-white mb-5"
            >
              Connecting Healthcare Talent with the Right Opportunities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Health Hire Hub is a healthcare-focused job platform designed to
              connect healthcare professionals with job opportunities across
              India. From doctors and nurses to pharmacists, technicians,
              medical coders and other healthcare professionals, we make it
              easier to discover relevant opportunities in one place.
            </p>
          </div>
        </section>

        {/* ── Stats bar ─────────────────────────────────────────────────────── */}
        <section
          className="bg-white-600 py-8 px-6"
          aria-label="Key facts about Health Hire Hub"
        >
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-heading font-bold text-black">
                  {stat.value}
                </p>
                <p className="text-xs text-black mt-1 font-body uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-14 sm:py-20">
          {/* What We Do + Mission: two-column on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-14">
            {/* What We Do */}
            <section aria-labelledby="what-we-do-heading">
              <span className="inline-block text-[0.7rem] font-bold text-blue-700 uppercase tracking-widest mb-3">
                What We Do
              </span>
              <h2
                id="what-we-do-heading"
                className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-snug mb-6"
              >
                One Platform for Healthcare Careers
              </h2>

              <ul className="flex flex-col gap-4" aria-label="What we do list">
                {WHAT_WE_DO.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    {/* Emerald checkmark — matches JobCard emerald CTA palette */}
                    <span
                      className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200"
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3 text-emerald-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm sm:text-base text-slate-600 font-body leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Our Mission */}
            <section aria-labelledby="our-mission-heading">
              <span className="inline-block text-[0.7rem] font-bold text-indigo-600 uppercase tracking-widest mb-3">
                Our Mission
              </span>
              <h2
                id="our-mission-heading"
                className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-snug mb-6"
              >
                Simple, Accessible &amp; Reliable
              </h2>

              <div className="rounded-2xl bg-[#0a2540] p-7 sm:p-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-indigo-400 mb-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-base sm:text-lg text-slate-200 font-body leading-relaxed italic">
                  &ldquo;To make healthcare job searching simple, accessible and
                  reliable for professionals across India.&rdquo;
                </p>
              </div>
            </section>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 mb-14" />

          {/* For Job Seekers & For Employers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
            {/* For Job Seekers */}
            <section
              aria-labelledby="job-seekers-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-600"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3 ml-3">
                For Job Seekers
              </span>
              <h2
                id="job-seekers-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                Find Your Next Role
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed mb-5">
                Explore healthcare opportunities across different professions,
                cities and organisations.
              </p>
              <Link
                href="/healthcare-jobs-in-india"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 text-sm font-semibold font-body hover:bg-emerald-50 hover:border-emerald-600 active:bg-emerald-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 no-underline"
                id="about-browse-jobs-link"
              >
                Browse Jobs
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
              </Link>
            </section>

            {/* For Employers */}
            <section
              aria-labelledby="employers-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-emerald-600"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-3 ml-3">
                For Employers
              </span>
              <h2
                id="employers-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                Reach the Right Talent
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed mb-5">
                Reach healthcare professionals and share your job openings with
                relevant candidates.
              </p>
              <PostJobButton id="about-post-job-btn" />
            </section>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 mb-14" />

          {/* Contact / Brand footer card */}
          <section
            aria-labelledby="contact-heading"
            className="rounded-2xl bg-[#0a2540] px-8 py-10 text-center"
          >
            <h2
              id="contact-heading"
              className="text-xl sm:text-2xl font-heading font-bold text-white mb-2"
            >
              Health Hire Hub
            </h2>
            <p className="text-sm text-indigo-300 font-body mb-1">
              HealthHireHub.com
            </p>
            <a
              href="mailto:info@HealthHireHub.com"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-150 font-body no-underline"
              id="about-contact-email"
            >
              info@HealthHireHub.com
            </a>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/healthcare-jobs-in-india"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-emerald-500 text-emerald-400 text-sm font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-150 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                id="about-cta-find-jobs"
              >
                Find Jobs
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-white/20 text-slate-300 text-sm font-semibold hover:bg-white/10 hover:text-white transition-colors duration-150 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                id="about-cta-contact"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>

      <NewDesignFooter />
    </>
  );
}
