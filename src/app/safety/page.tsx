import type { Metadata } from 'next';
import NewDesignHeader from '@/app/new-design/NewDesignHeader';
import NewDesignFooter from '@/app/new-design/NewDesignFooter';

export const metadata: Metadata = {
  title: 'Job Safety Guide | Health Hire Hub',
  description:
    "Search smart and apply safely. Follow Health Hire Hub's Job Safety Guide to protect yourself from fraudulent job listings and recruitment scams.",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const NEVER_PAY_ITEMS = [
  'Registration fees',
  'Interview fees',
  'Security deposits',
  'Joining fees',
  'Training payments before employment',
];

const VERIFY_EMPLOYER_ITEMS = [
  'Company or hospital name',
  'Official website',
  'Official email domain',
  'Office address',
  'Recruiter identity',
];

const PROTECT_INFO_ITEMS = [
  'Banking passwords',
  'OTPs',
  'Credit or debit card PINs',
  'UPI PINs',
  'Unnecessary financial information',
];

const RED_FLAGS_ITEMS = [
  'Promises a job without an interview',
  'Offers unusually high pay for very little work',
  'Creates unnecessary urgency',
  'Communicates only through unofficial accounts',
  'Requests payment',
  'Asks for sensitive financial information',
];

const CHECK_BEFORE_ITEMS = [
  'Employer name',
  'Job title',
  'Workplace location',
  'Salary',
  'Working hours',
  'Employment terms',
];

type Accent = 'indigo' | 'emerald' | 'amber';

interface SafetyCard {
  step: number;
  id: string;
  accent: Accent;
  label: string;
  heading: string;
  intro: string;
  items: string[];
  footnote?: string;
  icon: React.ReactNode;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PILL: Record<Accent, string> = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
};

const ICON_WRAP: Record<Accent, string> = {
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
};

const BULLET_DOT: Record<Accent, string> = {
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
};

const STEP_BADGE: Record<Accent, string> = {
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  amber: 'bg-amber-500 text-white',
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className ?? 'w-3 h-3'}
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BulletList({ items, accent }: { items: string[]; accent: Accent }) {
  return (
    <ul className="flex flex-col gap-3" aria-label="List">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border ${BULLET_DOT[accent]}`}
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
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SafetyPage() {
  const CARDS: SafetyCard[] = [
    {
      step: 1,
      id: 'never-pay',
      accent: 'amber',
      label: 'Never Pay for a Job',
      heading: 'Genuine employers never charge you',
      intro:
        'A genuine employer should not ask you to pay money simply to apply for a job or receive an interview. Be careful if someone asks for:',
      items: NEVER_PAY_ITEMS,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      step: 2,
      id: 'verify-employer',
      accent: 'indigo',
      label: 'Verify the Employer',
      heading: 'Check before you share anything',
      intro: 'Before sharing personal information, check:',
      items: VERIFY_EMPLOYER_ITEMS,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      ),
    },
    {
      step: 3,
      id: 'protect-info',
      accent: 'indigo',
      label: 'Protect Your Personal Information',
      heading: 'Keep sensitive data private',
      intro: 'Do not share sensitive information such as:',
      items: PROTECT_INFO_ITEMS,
      footnote:
        'Only provide identity documents when you are confident that the employer and hiring process are genuine.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      ),
    },
    {
      step: 4,
      id: 'red-flags',
      accent: 'amber',
      label: 'Watch for Red Flags',
      heading: 'Be cautious if someone:',
      intro: 'These are warning signs of a suspicious or fraudulent recruiter:',
      items: RED_FLAGS_ITEMS,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      ),
    },
    {
      step: 5,
      id: 'check-before',
      accent: 'emerald',
      label: 'Check Before Accepting',
      heading: 'Confirm key offer details',
      intro: 'Before accepting a job offer, confirm important details such as:',
      items: CHECK_BEFORE_ITEMS,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  ];

  return (
    <>
      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="text-white pt-16 pb-20 px-6"
          aria-labelledby="safety-hero-heading"
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
              Job Safety Guide
            </div>

            <h1
              id="safety-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight text-white mb-4"
            >
              Search Smart. Apply Safely.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[640px] mb-3">
              Health Hire Hub wants every healthcare professional to have a safe
              job search experience. Follow these simple precautions before
              applying for any opportunity.
            </p>
          </div>
        </section>

        {/* ── Steps ─────────────────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-14 sm:py-20 flex flex-col gap-6">
          {/* Steps grid — 2 cols on md, 3 cols on lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARDS.map(card => (
              <section
                key={card.id}
                aria-labelledby={`${card.id}-heading`}
                className="group rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200 flex flex-col gap-4"
              >
                {/* Step badge + icon */}
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-heading shrink-0 ${STEP_BADGE[card.accent]}`}
                  >
                    {card.step}
                  </span>
                  <div
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${ICON_WRAP[card.accent]}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      {card.icon}
                    </svg>
                  </div>
                </div>

                {/* Pill + heading */}
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL[card.accent]}`}
                  >
                    {card.label}
                  </span>
                  <h2
                    id={`${card.id}-heading`}
                    className="text-lg font-heading font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-150 leading-snug"
                  >
                    {card.heading}
                  </h2>
                </div>

                <p className="text-xs text-slate-500 font-body leading-relaxed">
                  {card.intro}
                </p>

                <BulletList items={card.items} accent={card.accent} />

                {card.footnote && (
                  <p className="text-xs text-slate-400 font-body leading-relaxed border-t border-slate-100 pt-3 mt-auto">
                    {card.footnote}
                  </p>
                )}
              </section>
            ))}
          </div>

          {/* ── Report + Closing reminder ─────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            {/* Report a Suspicious Listing */}
            <section
              aria-labelledby="report-heading"
              className="rounded-2xl bg-[#0a2540] p-7 sm:p-8 flex flex-col gap-4"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-amber-300"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
              </div>

              <div>
                <span className="inline-block text-[0.7rem] font-bold text-amber-400 uppercase tracking-widest mb-2">
                  Report a Suspicious Listing
                </span>
                <h2
                  id="report-heading"
                  className="text-xl font-heading font-bold text-white mb-3"
                >
                  Found Something Suspicious?
                </h2>
                <p className="text-sm text-slate-300 font-body leading-relaxed mb-1">
                  If you find a suspicious, misleading or incorrect job listing
                  on Health Hire Hub, please report it to:
                </p>
                <p className="text-xs text-slate-400 font-body leading-relaxed">
                  Include the job title, employer name and listing link where
                  possible.
                </p>
              </div>

              <a
                href="mailto:info@HealthHireHub.com"
                id="safety-report-email"
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg border border-amber-400 text-amber-300 text-sm font-semibold hover:bg-amber-400 hover:text-white transition-colors duration-150 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-auto"
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

            {/* Closing reminder */}
            <section
              aria-labelledby="reminder-heading"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8 flex flex-col gap-4 justify-between"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-200 shrink-0">
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
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>

              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 mb-3">
                  Remember
                </span>
                <h2
                  id="reminder-heading"
                  className="text-xl font-heading font-bold text-slate-900 mb-3 leading-snug"
                >
                  A safe job search is more important than a quick job offer.
                </h2>
                <p className="text-sm text-emerald-800 font-body leading-relaxed">
                  Take time to verify. Never rush into sharing personal details
                  or money with anyone you haven&apos;t fully verified.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-emerald-100 border border-emerald-200 px-4 py-3 mt-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs text-emerald-800 font-body leading-relaxed font-semibold">
                  Health Hire Hub will never ask you to pay to apply for jobs or
                  share sensitive financial information.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <NewDesignFooter />
    </>
  );
}
