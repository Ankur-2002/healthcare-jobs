import type { Metadata } from 'next';
import NewDesignHeader from '@/app/new-design/NewDesignHeader';
import NewDesignFooter from '@/app/new-design/NewDesignFooter';

export const metadata: Metadata = {
  title: 'Contact Us | Health Hire Hub',
  description:
    "Have a question about Health Hire Hub? Get in touch with us for job seeker support, employer enquiries, or platform feedback.",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const JOB_SEEKER_ITEMS = [
  'Need help using the platform',
  'Want to report an incorrect or suspicious job listing',
  'Have feedback or suggestions',
];

const EMPLOYER_ITEMS = [
  'Job posting support',
  'Employer-related enquiries',
  'Listing corrections',
  'Partnership enquiries',
];

// ── Shared primitives ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[0.7rem] font-bold text-indigo-600 uppercase tracking-widest mb-3">
      {children}
    </span>
  );
}

function BulletList({ items, color = 'emerald' }: { items: string[]; color?: 'emerald' | 'indigo' }) {
  const dotClass =
    color === 'emerald'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
      : 'bg-indigo-50 border-indigo-200 text-indigo-600';

  return (
    <ul className="flex flex-col gap-3" aria-label="List of items">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border ${dotClass}`}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-sm text-slate-600 font-body leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="text-white pt-16 pb-20 px-6"
          aria-labelledby="contact-hero-heading"
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
              Contact Us
            </div>

            <h1
              id="contact-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight text-white mb-5"
            >
              We&apos;re Here to Help
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[640px]">
              Have a question about Health Hire Hub, a job listing or our platform?
              Get in touch with us.
            </p>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-14 sm:py-20">

          {/* Top: General Enquiries + two audience cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

            {/* General Enquiries ─ full-height dark card */}
            <section
              aria-labelledby="general-enquiries-heading"
              className="rounded-2xl bg-[#0a2540] p-8 flex flex-col gap-5"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-300"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>

              <div>
                <SectionLabel>General Enquiries</SectionLabel>
                <h2
                  id="general-enquiries-heading"
                  className="text-xl font-heading font-bold text-white mb-4"
                >
                  Get in Touch
                </h2>

                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="text-xs text-slate-400 font-body uppercase tracking-widest mb-0.5">Email</dt>
                    <dd>
                      <a
                        href="mailto:info@HealthHireHub.com"
                        id="contact-email-link"
                        className="text-sm text-indigo-300 hover:text-white transition-colors duration-150 font-body no-underline"
                      >
                        info@HealthHireHub.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400 font-body uppercase tracking-widest mb-0.5">Website</dt>
                    <dd>
                      <a
                        href="https://HealthHireHub.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="contact-website-link"
                        className="text-sm text-indigo-300 hover:text-white transition-colors duration-150 font-body no-underline"
                      >
                        HealthHireHub.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="text-xs text-slate-400 font-body leading-relaxed mt-auto">
                We aim to review enquiries and respond as soon as reasonably possible.
              </p>
            </section>

            {/* Right two cards stacked */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* For Job Seekers */}
              <section
                aria-labelledby="job-seekers-contact-heading"
                className="group rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 shrink-0">
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
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-1">
                      Job Seekers
                    </span>
                    <h2
                      id="job-seekers-contact-heading"
                      className="text-lg font-heading font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-150"
                    >
                      Contact us if you:
                    </h2>
                  </div>
                </div>

                <BulletList items={JOB_SEEKER_ITEMS} color="indigo" />

                <a
                  href="mailto:info@HealthHireHub.com"
                  id="contact-job-seeker-email"
                  className="inline-flex items-center gap-1.5 mt-5 px-4 py-1.5 rounded-lg border border-indigo-400 text-indigo-600 text-sm font-semibold font-body hover:bg-indigo-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 no-underline"
                >
                  Email Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </a>
              </section>

              {/* For Employers */}
              <section
                aria-labelledby="employers-contact-heading"
                className="group rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 shrink-0">
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
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-1">
                      Employers
                    </span>
                    <h2
                      id="employers-contact-heading"
                      className="text-lg font-heading font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-150"
                    >
                      Contact us for:
                    </h2>
                  </div>
                </div>

                <BulletList items={EMPLOYER_ITEMS} color="emerald" />

                <a
                  href="mailto:info@HealthHireHub.com"
                  id="contact-employer-email"
                  className="inline-flex items-center gap-1.5 mt-5 px-4 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 text-sm font-semibold font-body hover:bg-emerald-50 hover:border-emerald-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 no-underline"
                >
                  Email Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </a>
              </section>
            </div>
          </div>

          {/* ── Safety Alert ──────────────────────────────────────────────── */}
          <section
            aria-labelledby="safety-alert-heading"
            className="rounded-2xl border border-amber-200 bg-amber-50 px-7 py-6 flex gap-4 items-start"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-amber-600"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h2
                id="safety-alert-heading"
                className="text-sm font-heading font-bold text-amber-800 mb-1"
              >
                Important — Job Scam Warning
              </h2>
              <p className="text-sm text-amber-700 font-body leading-relaxed">
                Health Hire Hub does <strong className="font-semibold">not</strong> ask job seekers to pay money for applying
                to jobs. If you receive a suspicious payment request claiming to be associated with us,
                please report it to{' '}
                <a
                  href="mailto:info@HealthHireHub.com"
                  id="contact-report-email"
                  className="font-semibold underline underline-offset-2 text-amber-800 hover:text-amber-900 transition-colors duration-150"
                >
                  info@HealthHireHub.com
                </a>
                .
              </p>
            </div>
          </section>

        </div>
      </main>

      <NewDesignFooter />
    </>
  );
}
