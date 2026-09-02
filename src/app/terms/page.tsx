import type { Metadata } from 'next';
import NewDesignHeader from '@/app/new-design/NewDesignHeader';
import NewDesignFooter from '@/app/new-design/NewDesignFooter';

export const metadata: Metadata = {
  title: 'Terms of Use | Health Hire Hub',
  description:
    'Read the Health Hire Hub Terms of Use. By using HealthHireHub.com you agree to these terms covering job listings, user responsibilities and platform usage.',
};

// ── Data ──────────────────────────────────────────────────────────────────────

const NO_GUARANTEE_ITEMS = [
  'Interviews',
  'Employment',
  'Job offers',
  'Salary or benefits',
  'Employer responses',
];

type Accent = 'indigo' | 'emerald' | 'amber' | 'dark';

interface TermsSection {
  id: string;
  accent: Accent;
  label: string;
  heading: string;
  body: React.ReactNode;
  iconPath: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const ICON_CLASS: Record<Accent, string> = {
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
  dark: 'bg-white/10 text-indigo-300',
};

const PILL_CLASS: Record<Accent, string> = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  dark: 'bg-white/10 text-slate-200 border-white/10',
};

const LABEL_CLASS: Record<Accent, string> = {
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
  dark: 'text-indigo-400',
};

function CheckBullet({ color }: { color: Accent }) {
  const cls =
    color === 'amber'
      ? 'bg-amber-50 border-amber-200 text-amber-600'
      : color === 'emerald'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
      : 'bg-indigo-50 border-indigo-200 text-indigo-600';

  return (
    <span
      className={`mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border ${cls}`}
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <>
      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="text-white pt-16 pb-20 px-6"
          aria-labelledby="terms-hero-heading"
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
              Terms of Use
            </div>

            <h1
              id="terms-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight text-white mb-4"
            >
              Terms of Use
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[640px] mb-3">
              By using HealthHireHub.com, you agree to these Terms of Use.
            </p>

            <p className="text-xs text-slate-400 font-body">Last Updated: September 2026</p>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-14 sm:py-20 flex flex-col gap-6">

          {/* Row 1: About + Job Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* About Health Hire Hub */}
            <section
              aria-labelledby="about-hhh-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 ${ICON_CLASS.indigo}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL_CLASS.indigo}`}>
                About Health Hire Hub
              </span>
              <h2
                id="about-hhh-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                What We Are
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed mb-2">
                Health Hire Hub is an online platform that helps users discover
                healthcare-related job opportunities.
              </p>
              <p className="text-sm text-slate-500 font-body leading-relaxed">
                We may display jobs submitted by employers or sourced from publicly
                available and third-party sources.
              </p>
            </section>

            {/* Job Listings */}
            <section
              aria-labelledby="job-listings-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 ${ICON_CLASS.emerald}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL_CLASS.emerald}`}>
                Job Listings
              </span>
              <h2
                id="job-listings-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                Accuracy of Listings
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed mb-2">
                We aim to provide useful and accurate job information. However, Health
                Hire Hub does not guarantee that every listing is complete, current,
                accurate or still available.
              </p>
              <p className="text-sm text-slate-500 font-body leading-relaxed">
                Users should verify job details directly with the employer before
                applying or accepting an offer.
              </p>
            </section>
          </div>

          {/* Row 2: No Employment Guarantee — full width dark card */}
          <section
            aria-labelledby="no-guarantee-heading"
            className="rounded-2xl bg-[#0a2540] p-7 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="shrink-0">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 mb-4 sm:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-300" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <span className="inline-block text-[0.7rem] font-bold text-amber-400 uppercase tracking-widest mb-2">
                  No Employment Guarantee
                </span>
                <h2
                  id="no-guarantee-heading"
                  className="text-xl font-heading font-bold text-white mb-4"
                >
                  Health Hire Hub does not guarantee:
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-label="No-guarantee items">
                  {NO_GUARANTEE_ITEMS.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 border border-white/20 shrink-0" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-amber-400">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-300 font-body">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 font-body mt-5 pt-4 border-t border-white/10">
                  Hiring decisions are made entirely by the relevant employer.
                </p>
              </div>
            </div>
          </section>

          {/* Row 3: User Responsibility + External Websites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* User Responsibility */}
            <section
              aria-labelledby="user-responsibility-heading"
              className="rounded-2xl border border-amber-200 bg-amber-50 p-7 sm:p-8"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 ${ICON_CLASS.amber}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL_CLASS.amber}`}>
                User Responsibility
              </span>
              <h2
                id="user-responsibility-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3"
              >
                Stay Safe
              </h2>
              <p className="text-sm text-amber-800 font-body leading-relaxed mb-3">
                Users are responsible for checking the authenticity of employers and job
                opportunities before sharing personal information or taking further action.
              </p>
              <div className="flex items-start gap-3 rounded-xl bg-amber-100 border border-amber-200 px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-xs text-amber-800 font-body leading-relaxed font-semibold">
                  Never send money, banking passwords, OTPs or other sensitive information
                  to unknown recruiters.
                </p>
              </div>
            </section>

            {/* External Websites */}
            <section
              aria-labelledby="external-websites-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 ${ICON_CLASS.indigo}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL_CLASS.indigo}`}>
                External Websites
              </span>
              <h2
                id="external-websites-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                Third-Party Links
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed">
                Health Hire Hub may contain links to third-party websites. We are not
                responsible for their content, services, security or practices.
              </p>
            </section>
          </div>

          {/* Row 4: Website Use + Changes — two small cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Website Use */}
            <section
              aria-labelledby="website-use-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 ${ICON_CLASS.emerald}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL_CLASS.emerald}`}>
                Website Use
              </span>
              <h2
                id="website-use-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                Acceptable Use
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed">
                Users must not misuse the platform, provide false information, attempt
                unauthorised access or use Health Hire Hub for fraudulent or unlawful
                activities.
              </p>
            </section>

            {/* Changes */}
            <section
              aria-labelledby="changes-heading"
              className="group rounded-2xl border border-slate-200 p-7 sm:p-8 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-5 ${ICON_CLASS.indigo}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${PILL_CLASS.indigo}`}>
                Changes
              </span>
              <h2
                id="changes-heading"
                className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors duration-150"
              >
                Updates to These Terms
              </h2>
              <p className="text-sm text-slate-500 font-body leading-relaxed">
                We may update these terms when required. Continued use of the website
                means you accept the latest version.
              </p>
            </section>
          </div>

          {/* ── Contact card ──────────────────────────────────────────────── */}
          <section
            aria-labelledby="terms-contact-heading"
            className="rounded-2xl bg-[#0a2540] px-8 py-10 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-5 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-300" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2
              id="terms-contact-heading"
              className="text-xl sm:text-2xl font-heading font-bold text-white mb-2"
            >
              Questions About These Terms?
            </h2>
            <p className="text-sm text-slate-400 font-body mb-5">
              For questions regarding these terms, contact us at:
            </p>
            <a
              href="mailto:info@HealthHireHub.com"
              id="terms-contact-email"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500 text-emerald-400 text-sm font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-150 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
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
