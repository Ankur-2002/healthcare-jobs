import Image from 'next/image';
import Link from 'next/link';

const FOOTER_COLUMNS = [
  {
    title: 'Jobs',
    links: [
      { label: 'Find Jobs', href: '/healthcare-jobs-in-india' },
      { label: 'Jobs by Profession', href: '/healthcare-jobs-in-india' },
      { label: 'Jobs by City', href: '/healthcare-jobs-in-india' },
      { label: 'All Healthcare Jobs', href: '/healthcare-jobs-in-india' },
      { label: 'Fresher Jobs', href: '/healthcare-jobs-in-india' },
    ],
  },
  {
    title: 'Popular Professions',
    links: [
      { label: 'Nursing Jobs', href: '/nurse-jobs-in-india' },
      { label: 'Doctor Jobs', href: '/doctor-jobs-in-india' },
      { label: 'Pharmacist Jobs', href: '/pharmacist-jobs-in-india' },
      { label: 'Medical Coding Jobs', href: '/medical-coder-jobs-in-india' },
      { label: 'Lab Technician Jobs', href: '/lab-technician-jobs-in-india' },
    ],
  },

  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      // { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Job Safety Guide', href: '/safety' },
    ],
  },
];

const SOCIAL_LINKS: any[] = [
  //   {
  //     label: 'Facebook',
  //     href: 'https://facebook.com',
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //         fill="currentColor"
  //         className="w-[18px] h-[18px]"
  //         aria-hidden="true"
  //       >
  //         <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     label: 'LinkedIn',
  //     href: 'https://linkedin.com',
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //         fill="currentColor"
  //         className="w-[18px] h-[18px]"
  //         aria-hidden="true"
  //       >
  //         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     label: 'Twitter / X',
  //     href: 'https://twitter.com',
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //         fill="currentColor"
  //         className="w-[18px] h-[18px]"
  //         aria-hidden="true"
  //       >
  //         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     label: 'Instagram',
  //     href: 'https://instagram.com',
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 24 24"
  //         fill="currentColor"
  //         className="w-[18px] h-[18px]"
  //         aria-hidden="true"
  //       >
  //         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  //       </svg>
  //     ),
  //   },
];

export default function NewDesignFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0a2540] text-slate-400 pt-12"
      aria-label="Site footer"
    >
      <div className="max-w-[1152px] mx-auto px-6">
        {/* Top grid: brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_2fr_2fr_1fr] gap-8 pb-10">
          {/* Brand */}
          <div>
            <Link
              href="/new-design"
              className="flex items-center gap-2 shrink-0 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg text-white"
              aria-label="Health Hire Hub — Go to homepage"
            >
              {/* ADD LOGO HERE */}
              <Image
                src="/health-hire-hub-logo.png"
                alt="logo"
                width={95}
                height={64}
                className="text-white"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] text-white">
              Health Hire Hub is India&apos;s trusted portal for healthcare jobs
              and opportunities.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-5" aria-label="Social media links">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[34px] h-[34px] rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 no-underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 text-white"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.title}>
              <h3 className="text-[0.7rem] font-bold text-slate-300 uppercase tracking-widest mb-3.5 font-heading">
                {col.title}
              </h3>
              <ul
                className="flex flex-col gap-2 list-none p-0 m-0"
                aria-label={col.title}
              >
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.8rem] text-slate-500 hover:text-slate-200 no-underline transition-colors duration-150 focus-visible:outline-none text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-xs text-slate-600">
            © {year} Health Hire Hub. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            Built for healthcare professionals across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
