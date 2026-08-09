'use client';

import { useState } from 'react';
import Link from 'next/link';
import PostJobModal from '@/components/PostJobModal';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Find Jobs', href: '/healthcare-jobs-in-india' },
  {
    label: 'Jobs by Profession',
    href: '#',
    children: [
      { label: 'Nursing Jobs', href: '/nurse-jobs-in-india' },
      { label: 'Doctor Jobs', href: '/doctor-jobs-in-india' },
      { label: 'Pharmacist Jobs', href: '/pharmacist-jobs-in-india' },
      { label: 'Lab Technician Jobs', href: '/lab-technician-jobs-in-india' },
      { label: 'Medical Coder Jobs', href: '/medical-coder-jobs-in-india' },
    ],
  },
  {
    label: 'Jobs by City',
    href: '#',
    children: [
      { label: 'Jobs in Bengaluru', href: '/healthcare-jobs-in-bengaluru' },
      { label: 'Jobs in Hyderabad', href: '/healthcare-jobs-in-hyderabad' },
      { label: 'Jobs in Mumbai', href: '/healthcare-jobs-in-mumbai' },
      { label: 'Jobs in Delhi', href: '/healthcare-jobs-in-delhi' },
      { label: 'Jobs in Chennai', href: '/healthcare-jobs-in-chennai' },
    ],
  },
  { label: 'Career Resources', href: '/career-resources' },
  { label: 'For Employers', href: '/employers' },
];

export default function NewDesignHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center h-16 gap-6">
          {/* Logo */}
          <Link
            href="/new-design"
            className="flex items-center gap-2 shrink-0 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
            aria-label="Health Hire Hub — Go to homepage"
          >
            {/* ADD LOGO HERE */}
            <Image
              src="/health-hire-hub-logo.png"
              alt="logo"
              width={95}
              height={64}
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(link => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <>
                    <button
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label,
                        )
                      }
                      onBlur={() =>
                        setTimeout(() => setOpenDropdown(null), 150)
                      }
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-slate-400"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {openDropdown === link.label && (
                      <div
                        className="absolute top-[calc(100%+8px)] left-0 min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-fade-in-up"
                        role="menu"
                      >
                        {link.children.map(child => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 no-underline transition-colors duration-150 focus-visible:outline-none"
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50 no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right: CTA + Mobile toggle */}
          <div className="flex items-center gap-3 ml-auto shrink-0">
            <button
              id="ndh-post-job-btn"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
              aria-label="Post a healthcare job"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Post a Job
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-0"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.children ? link.children[0].href : link.href}
                className="block py-2.5 text-sm font-semibold text-slate-700 border-b border-slate-100 hover:text-sky-700 no-underline transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="mt-3 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors duration-200 cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              Post a Job
            </button>
          </div>
        )}
      </header>

      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
