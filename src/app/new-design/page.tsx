import Link from 'next/link';
import {
  getFeaturedProfessionLinks,
  getTopProfessions,
  getTopCities,
  getLatestJobs,
} from '@/services/jobs';
import type { Job } from '@/types';
import { generateSlug, toTitleCase } from '@/lib/slug';
import NewDesignHeader from './NewDesignHeader';
import NewDesignFooter from './NewDesignFooter';
import HeroSearchBar from './HeroSearchBar';
import Image from 'next/image';

export const revalidate = 3600;

// ─── Static fallback data ────────────────────────────────────────────────────

const PROFESSIONS = [
  { name: 'Nursing', slug: 'nurse-jobs-in-india', count: 1802 },
  { name: 'Doctor', slug: 'doctor-jobs-in-india', count: 920 },
  { name: 'Pharmacist', slug: 'pharmacist-jobs-in-india', count: 510 },
  { name: 'Medical Coding', slug: 'medical-coder-jobs-in-india', count: 410 },
  {
    name: 'Lab & Diagnostic',
    slug: 'lab-technician-jobs-in-india',
    count: 340,
  },
  { name: 'Paramedical', slug: 'paramedic-jobs-in-india', count: 280 },
  { name: 'Allied Health', slug: 'allied-health-jobs-in-india', count: 300 },
  { name: 'Hospital Admin', slug: 'hospital-admin-jobs-in-india', count: 280 },
];

const TOP_CITIES = [
  { name: 'Bengaluru', count: 920 },
  { name: 'Hyderabad', count: 760 },
  { name: 'Mumbai', count: 650 },
  { name: 'Delhi', count: 620 },
  { name: 'Chennai', count: 480 },
  { name: 'Kolkata', count: 380 },
  { name: 'Pune', count: 340 },
  { name: 'Ahmedabad', count: 320 },
  { name: 'Gurugram', count: 310 },
  { name: 'Lucknow', count: 220 },
];

const POPULAR_SEARCHES = [
  { label: 'Nurse Jobs in Bengaluru', count: 168 },
  { label: 'Nurse Jobs in Hyderabad', count: 164 },
  { label: 'Doctor Jobs in Hyderabad', count: 128 },
  { label: 'Pharmacist Jobs in Bengaluru', count: 112 },
  { label: 'Medical Coding Jobs in Hyderabad', count: 102 },
  { label: 'Lab Technician Jobs in Bengaluru', count: 98 },
  { label: 'Nurse Jobs in Delhi', count: 92 },
  { label: 'Doctor Jobs in Mumbai', count: 87 },
];

const TRUST_BADGES = [
  {
    title: 'Verified & Transparent',
    desc: 'We source and verify jobs from trusted employers.',
    icon: '/trust/verified-transparent.svg',
  },
  {
    title: '100% Free for Job Seekers',
    desc: 'No registration or payment required to apply.',
    icon: '/trust/free-for-job-seekers.svg',
  },
  {
    title: 'Safe Job Search',
    desc: 'We never ask for money or charge job seekers.',
    icon: '/trust/safe-job-search.svg',
  },
  {
    title: 'Dedicated Support',
    desc: "We're here to support you at every step of your career.",
    icon: '/trust/dedicated-support.svg',
  },
];

const WHY_FEATURES = [
  {
    title: 'Huge Job Database',
    desc: 'Thousands of active jobs updated daily.',
    icon: '/whyUs/huge-job-database.svg',
  },
  {
    title: 'Smart Search',
    desc: 'Find jobs by role, location, experience and more.',
    icon: '/whyUs/smart-search.svg',
  },
  {
    title: 'Trusted Platform',
    desc: 'Transparent listings with accurate, up-to-date info.',
    icon: '/whyUs/trusted-platform.svg',
  },
  {
    title: 'Career Resources',
    desc: 'Guides, tips and tools to grow your career.',
    icon: '/whyUs/career-resources.svg',
  },
  {
    title: 'Employer Trusted',
    desc: 'Top hospitals and healthcare organisations hire here.',
    icon: '/whyUs/employer-trusted.svg',
  },
];

const STATS = [
  { label: 'Active Jobs', value: '5,800+', icon: '/briefcase.svg' },
  {
    label: 'Healthcare Employers',
    value: '1,200+',
    icon: '/building.svg',
  },
  {
    label: 'Cities in India',
    value: '150+',
    icon: '/map-pin.svg',
  },
  {
    label: 'Fresh Opportunities',
    value: 'Updated Daily',
    icon: '/refresh.svg',
  },
];

// ─── SVG helpers ──────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const PinIcon = ({ cls = 'w-3.5 h-3.5 shrink-0' }: { cls?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={cls}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
      clipRule="evenodd"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[22px] h-[22px]"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-sky-700 transition-colors duration-150"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
      clipRule="evenodd"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function NewDesignPage() {
  let topProfessions: Array<{
    profession: string;
    count: number;
    slug: string;
  }> = [];
  let topCities: Array<{ location: string; count: number }> = [];
  let latestJobs: Job[] = [];
  let featuredLinks: Array<{
    profession: string;
    location: string;
    slug: string;
    count: number;
  }> = [];

  try {
    [topProfessions, topCities, latestJobs, featuredLinks] = await Promise.all([
      getTopProfessions(8),
      getTopCities(10),
      getLatestJobs(4),
      getFeaturedProfessionLinks(),
    ]);
  } catch {
    // DB not configured — use static placeholders
  }

  const displayCities =
    topCities.length > 0
      ? topCities.map(c => ({ name: c.location, count: c.count }))
      : TOP_CITIES;

  const professionCards =
    topProfessions.length > 0
      ? topProfessions.map(p => ({
          name: toTitleCase(p.profession),
          slug: p.slug,
          count: p.count,
        }))
      : PROFESSIONS;

  const popularSearchLinks =
    featuredLinks.length > 0
      ? featuredLinks.slice(0, 8).map(f => ({
          label: `${toTitleCase(f.profession)} in ${toTitleCase(f.location)}`,
          count: f.count,
          href: `/${f.slug}`,
        }))
      : POPULAR_SEARCHES.map(s => ({
          label: s.label,
          count: s.count,
          href: '/healthcare-jobs-in-india',
        }));

  return (
    <>
      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">
        {/* ── HERO ────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg,#0a2540 0%,#0d3460 40%,#1a4d80 70%,#0f3d6e 100%)',
          }}
          aria-labelledby="nd-hero-heading"
        >
          {/* Glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 80% 50%,rgba(14,165,233,.12) 0%,transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center py-14 pb-12">
              {/* Left */}
              <div className="max-w-[600px]">
                {/* India badge */}
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-green-300 mb-5"
                  style={{
                    background: 'rgba(34,197,94,.15)',
                    border: '1px solid rgba(34,197,94,.3)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  India&apos;s Trusted Healthcare Job Portal
                </div>

                <h1
                  id="nd-hero-heading"
                  className="text-4xl sm:text-5xl font-extrabold  leading-tight mb-4 font-heading text-white"
                >
                  Find Healthcare
                  <br />
                  <span className="">Jobs in India</span>
                </h1>

                <p className="text-sky-200 text-sm sm:text-base leading-relaxed mb-7">
                  Discover the latest opportunities for nurses, doctors,
                  pharmacists, lab technicians, medical coders and other
                  healthcare professionals in top hospitals and healthcare
                  organisations.
                </p>

                <HeroSearchBar topProfession={professionCards} />
              </div>

              {/* Right – Stats */}
              <div className="grid grid-cols-2 gap-3 min-w-[260px]">
                {STATS.map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-5 text-center transition-colors duration-200 flex flex-col items-center justify-center gap-1"
                    style={{
                      background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(255,255,255,.12)',
                    }}
                  >
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={36}
                      height={36}
                      className="mb-1 text-white"
                      aria-hidden="true"
                    />
                    <div className="text-2xl font-extrabold text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ────────────────────────────────────────── */}
        <section
          className="bg-white border-b border-slate-200 py-8"
          aria-label="Why job seekers trust Health Hire Hub"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_BADGES.map(badge => (
                <div key={badge.title} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Image
                      src={badge.icon}
                      alt={badge.title}
                      width={24}
                      height={24}
                      className="text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-snug">
                      {badge.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {badge.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST HEALTHCARE JOBS ──────────────────────────────── */}
        {latestJobs.length > 0 && (
          <section
            className="py-16 bg-slate-50"
            aria-labelledby="nd-latest-heading"
          >
            <div className="max-w-[1152px] mx-auto px-6">
              <div className="flex items-end justify-between mb-7 gap-4 flex-wrap">
                <div>
                  <h2
                    id="nd-latest-heading"
                    className="text-2xl font-extrabold text-slate-900 font-heading"
                  >
                    Latest Healthcare Jobs
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Recently posted opportunities from top hospitals and
                    healthcare organisations.
                  </p>
                </div>
                <Link
                  href="/healthcare-jobs-in-india"
                  className="text-sm font-bold text-sky-700 hover:text-sky-500 transition-colors duration-150 shrink-0"
                >
                  View all jobs →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {latestJobs.map(job => {
                  const diffMs =
                    Date.now() - new Date(job.postedDate).getTime();
                  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffD = Math.floor(diffH / 24);
                  const timeAgo =
                    diffH < 1
                      ? 'Just now'
                      : diffH < 24
                        ? `${diffH}h ago`
                        : `${diffD}d ago`;

                  return (
                    <a
                      key={job.jobId}
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 min-h-[220px] cursor-pointer no-underline transition-all duration-200 hover:border-sky-600 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      aria-label={`${job.title} at ${job.company} — Apply now`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                            {job.profession}
                          </span>
                          <span className="text-xs text-slate-400 shrink-0">
                            {timeAgo}
                          </span>
                        </div>
                        <h3 className="text-[0.95rem] font-bold text-slate-900 leading-snug mb-0.5 font-heading group-hover:text-sky-700 transition-colors duration-150">
                          {job.title}
                        </h3>
                        <p className="text-[0.8rem] text-sky-700 font-medium mb-1">
                          {job.company}
                        </p>
                        <div className="flex flex-wrap gap-2.5 text-xs text-slate-500 mb-2">
                          <span className="flex items-center gap-1">
                            <PinIcon />
                            {job.location}
                          </span>
                          <span>Full Time</span>
                        </div>
                        <p className="text-[0.8rem] text-slate-600 leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-100">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          {job.category}
                        </span>
                        <span className="text-xs font-bold text-sky-700">
                          View Job →
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── BROWSE JOBS BY PROFESSION ───────────────────────────── */}
        <section
          className="py-16 bg-white"
          aria-labelledby="nd-profession-heading"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-end justify-between mb-7 gap-4 flex-wrap">
              <div>
                <h2
                  id="nd-profession-heading"
                  className="text-2xl font-extrabold text-slate-900 font-heading"
                >
                  Browse Jobs by Profession
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Explore opportunities in your field of expertise.
                </p>
              </div>
              <Link
                href="/healthcare-jobs-in-india"
                className="text-sm font-bold text-sky-700 hover:text-sky-500 transition-colors duration-150 shrink-0"
              >
                View all professions →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {professionCards.map(p => (
                <Link
                  key={p.name}
                  href={`/${p.slug}`}
                  className="group flex items-center gap-3.5 px-4 py-4 border border-slate-200 rounded-xl bg-white no-underline cursor-pointer transition-all duration-200 hover:border-sky-600 hover:bg-sky-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-label={`Browse ${p.name} jobs`}
                >
                  <div
                    className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <BriefcaseIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 font-heading">
                      {p.name} Jobs
                    </div>
                    {p.count > 0 && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        {p.count.toLocaleString()}+ Jobs
                      </div>
                    )}
                  </div>
                  <ChevronRightIcon />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR SEARCHES + JOBS BY CITY ─────────────────────── */}
        <section
          className="py-16 bg-slate-50"
          aria-label="Popular job searches and jobs by city"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Popular Searches */}
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Popular Job Searches
                </h2>
                <p className="text-slate-500 text-sm mt-1 mb-5">
                  Top profession and city combinations.
                </p>
                <div className="flex flex-col">
                  {popularSearchLinks.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex justify-between items-center py-2.5 border-b border-slate-200 text-sm font-medium text-blue-800 no-underline transition-colors duration-150 hover:text-blue-600 cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                        {item.count}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/healthcare-jobs-in-india"
                  className="inline-block mt-4 text-sm font-bold text-sky-700 hover:text-sky-500 transition-colors duration-150"
                >
                  Explore more searches →
                </Link>
              </div>

              {/* Jobs by City */}
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Jobs by City
                </h2>
                <p className="text-slate-500 text-sm mt-1 mb-5">
                  Find healthcare opportunities in your city.
                </p>
                {/* Show only 3 cols in mobile & 4 cols in larger screen */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {displayCities.slice(0, 10).map(city => (
                    <Link
                      key={city.name}
                      href={`/${generateSlug('healthcare', city.name)}`}
                      className="flex flex-col items-center gap-1 bg-white border border-slate-200 rounded-xl py-3.5 px-2 text-center no-underline cursor-pointer transition-all duration-200 hover:border-sky-600 hover:bg-sky-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      aria-label={`Healthcare jobs in ${city.name}`}
                    >
                      <PinIcon cls="w-5 h-5 text-sky-700" />
                      <span className="text-xs font-bold text-slate-900 leading-tight">
                        {toTitleCase(city.name)}
                      </span>
                      <span className="text-[0.65rem] text-slate-500">
                        {city.count}+ Jobs
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/healthcare-jobs-in-india"
                  className="inline-block mt-4 text-sm font-bold text-sky-700 hover:text-sky-500 transition-colors duration-150"
                >
                  View all cities →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE HEALTH HIRE HUB ──────────────────────────── */}
        <section className="py-16 bg-white" aria-labelledby="nd-why-heading">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2
              id="nd-why-heading"
              className="text-2xl font-extrabold text-slate-900 text-center mb-8 font-heading"
            >
              Why Choose Health Hire Hub?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {WHY_FEATURES.map(f => (
                <div
                  key={f.title}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 transition-all duration-200 hover:border-sky-200 hover:shadow-md flex items-start gap-4"
                >
                  {/* <div
                    className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3.5"
                    aria-hidden="true"
                  > */}
                  <Image src={f.icon} alt="icon" width={24} height={24} />
                  {/* </div> */}
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-1 font-heading">
                      {f.title}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EMPLOYER CTA BANNER ─────────────────────────────────── */}
        <section
          className="py-4 bg-white"
          style={
            {
              // background:
              //   'linear-gradient(135deg,#0a2540 0%,#0d3460 60%,#1a4d80 100%)',
            }
          }
          aria-labelledby="nd-cta-heading"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 bg-green-700 rounded-md p-6">
              <div>
                <h2
                  id="nd-cta-heading"
                  className="text-3xl font-extrabold text-white mb-2 font-heading"
                >
                  Hiring Healthcare Professionals?
                </h2>
                <p className="text-white text-sm max-w-lg">
                  Post your vacancy and reach thousands of qualified candidates
                  across India. It takes less than 2 minutes.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/post-job"
                  id="nd-cta-post-btn"
                  className="inline-flex items-center px-7 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors duration-200 no-underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                >
                  Post a Job — Free →
                </Link>
                <Link
                  href="/employers"
                  id="nd-cta-employer-btn"
                  className="inline-flex items-center px-7 py-3 rounded-lg text-white font-bold text-sm transition-all duration-200 no-underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  style={{ border: '1.5px solid rgba(255,255,255,.4)' }}
                >
                  For Employers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewDesignFooter />
    </>
  );
}
