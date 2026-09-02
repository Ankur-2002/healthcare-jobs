import type { Metadata } from 'next';
import NewDesignHeader from '@/app/new-design/NewDesignHeader';
import NewDesignFooter from '@/app/new-design/NewDesignFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | Health Hire Hub',
  description:
    'Read the Health Hire Hub Privacy Policy to understand how we collect, use and protect your information when you visit HealthHireHub.com.',
};

// ── Data ──────────────────────────────────────────────────────────────────────

const INFO_WE_COLLECT = [
  'Name',
  'Email address',
  'Contact details',
  'Job-related information',
  'Employer or organisation details',
  'Messages sent through our contact forms',
];

const HOW_WE_USE = [
  'Operate and improve Health Hire Hub',
  'Display and manage job listings',
  'Respond to enquiries',
  'Improve website performance and user experience',
  'Prevent misuse, fraud or security issues',
];

const SECTIONS = [
  {
    id: 'info-collect',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    ),
    label: 'Information We May Collect',
    heading: 'What We Collect',
    color: 'indigo' as const,
    items: INFO_WE_COLLECT,
    prose: 'We may collect information that you voluntarily provide, such as:',
    footnote:
      'We may also collect basic technical information such as browser type, device information, IP address and website usage data.',
  },
  {
    id: 'how-we-use',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.28c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
      />
    ),
    label: 'How We Use Information',
    heading: 'How We Use It',
    color: 'emerald' as const,
    items: HOW_WE_USE,
    prose: 'Information may be used to:',
    footnote: null,
  },
];

// ── Shared primitives ─────────────────────────────────────────────────────────

type AccentColor = 'indigo' | 'emerald';

const ACCENT: Record<AccentColor, { icon: string; pill: string; dot: string; cta: string }> = {
  indigo: {
    icon: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    pill: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    dot: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    cta: 'border-indigo-400 text-indigo-600 hover:bg-indigo-50',
  },
  emerald: {
    icon: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    dot: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    cta: 'border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600',
  },
};

function CheckIcon() {
  return (
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
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <>
      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="text-white pt-16 pb-20 px-6"
          aria-labelledby="privacy-hero-heading"
          style={{
            background:
              'linear-gradient(135deg,#0a2540 0%,#0d3460 40%,#1a4d80 70%,#0f3d6e 100%)',
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-green-300 mb-5"
              style={{
                background: 'rgba(34,197,94,.15)',
                border: '1px solid rgba(34,197,94,.3)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              Privacy Policy
            </div>

            <h1
              id="privacy-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight text-white mb-4"
            >
              Your Privacy Matters
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[640px] mb-3">
              Health Hire Hub respects your privacy. This Privacy Policy explains how
              information may be collected and used when you visit HealthHireHub.com.
            </p>

            <p className="text-xs text-slate-400 font-body">Last Updated: September 2026</p>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-14 sm:py-20">

          {/* Collect + Use — two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {SECTIONS.map(sec => {
              const a = ACCENT[sec.color];
              return (
                <section
                  key={sec.id}
                  aria-labelledby={`${sec.id}-heading`}
                  className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
                >
                  {/* Icon + pill */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border shrink-0 ${a.icon}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        {sec.icon}
                      </svg>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-1 ${a.pill}`}
                      >
                        {sec.label}
                      </span>
                      <h2
                        id={`${sec.id}-heading`}
                        className="text-xl font-heading font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-150"
                      >
                        {sec.heading}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 font-body mb-4">{sec.prose}</p>

                  <ul className="flex flex-col gap-3" aria-label={sec.label}>
                    {sec.items.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border ${a.dot}`}
                          aria-hidden="true"
                        >
                          <CheckIcon />
                        </span>
                        <span className="text-sm text-slate-600 font-body leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {sec.footnote && (
                    <p className="text-xs text-slate-400 font-body leading-relaxed mt-5 border-t border-slate-100 pt-4">
                      {sec.footnote}
                    </p>
                  )}
                </section>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 mb-10" />

          {/* Third-Party + Data Security — two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">

            {/* Third-Party Websites */}
            <section
              aria-labelledby="third-party-heading"
              className="rounded-2xl bg-[#0a2540] p-7 sm:p-8"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 mb-5">
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
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </div>
              <span className="inline-block text-[0.7rem] font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Third-Party Websites
              </span>
              <h2
                id="third-party-heading"
                className="text-xl font-heading font-bold text-white mb-4"
              >
                External Links
              </h2>
              <p className="text-sm text-slate-300 font-body leading-relaxed mb-3">
                Job listings may link to external employer or recruitment websites. Health
                Hire Hub is not responsible for the privacy practices or content of
                third-party websites.
              </p>
              <p className="text-sm text-slate-400 font-body leading-relaxed">
                Please review their privacy policies before providing personal information.
              </p>
            </section>

            {/* Data Security */}
            <section
              aria-labelledby="data-security-heading"
              className="rounded-2xl bg-[#0a2540] p-7 sm:p-8"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-emerald-300"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <span className="inline-block text-[0.7rem] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                Data Security
              </span>
              <h2
                id="data-security-heading"
                className="text-xl font-heading font-bold text-white mb-4"
              >
                Keeping Data Safe
              </h2>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                We take reasonable measures to protect information. However, no online
                platform can guarantee complete security.
              </p>
            </section>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 mb-10" />

          {/* Contact card */}
          <section
            aria-labelledby="privacy-contact-heading"
            className="rounded-2xl bg-[#0a2540] px-8 py-10 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-5 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-indigo-300"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>

            <h2
              id="privacy-contact-heading"
              className="text-xl sm:text-2xl font-heading font-bold text-white mb-2"
            >
              Privacy Questions?
            </h2>
            <p className="text-sm text-slate-400 font-body mb-5">
              For privacy-related questions, contact us at:
            </p>
            <a
              href="mailto:info@HealthHireHub.com"
              id="privacy-contact-email"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500 text-emerald-400 text-sm font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-150 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              info@HealthHireHub.com
            </a>
          </section>

        </div>
      </main>

      <NewDesignFooter />
    </>
  );
}
