import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import {
  parseSlug,
  professionDisplayName,
  locationDisplayName,
} from '@/lib/slug';
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateJobPostingsJsonLd,
} from '@/lib/metadata';
import {
  getJobs,
  getJobCount,
  getStaticPages,
  getProfessionCities,
  getProfessionsInCity,
} from '@/services/jobs';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingContent from '@/components/LandingContent';
import JobList from '@/components/JobList';
import Pagination from '@/components/Pagination';
import RelatedLinks from '@/components/RelatedLinks';
import ProfessionCities from '@/components/ProfessionCities';
import CityProfessions from '@/components/CityProfessions';
import NewDesignHeader from '../new-design/NewDesignHeader';
import NewDesignFooter from '../new-design/NewDesignFooter';

// ISR — regenerate every hour
export const revalidate = 3600;

// ---------------------------------------------------------------------------
// generateStaticParams — pre-render all real profession/location pages
// Never generates empty pages
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const pages = await getStaticPages();
  return pages.map(p => ({ slug: p.slug }));
}

// ---------------------------------------------------------------------------
// generateMetadata — dynamic SEO metadata per page
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  return generatePageMetadata(parsed.profession, parsed.location);
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
const PER_PAGE = 20;

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam, sort: sortParam } = await searchParams;
  const sort = sortParam === 'oldest' ? 'oldest' : 'newest';

  // Parse slug → profession + location
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { profession, location } = parsed;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  // Fetch data in parallel
  const [jobs, total, professionCities, cityProfessions] = await Promise.all([
    getJobs(profession, location, page, PER_PAGE, sort),
    getJobCount(profession, location),
    getProfessionCities(profession),
    getProfessionsInCity(location, profession),
  ]);

  // 404 if no jobs exist for this combination
  if (total === 0 && page === 1) notFound();

  const totalPages = Math.ceil(total / PER_PAGE);
  const professionDisplay = professionDisplayName(profession);
  const locationDisplay = locationDisplayName(location);

  // JSON-LD structured data
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(profession, location, slug);
  const jobPostingsJsonLd = generateJobPostingsJsonLd(jobs);

  return (
    <>
      {/* JSON-LD — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* JSON-LD — JobPosting (one per job) */}
      {jobPostingsJsonLd.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <NewDesignHeader />

      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero / Landing section */}
        <LandingContent
          profession={professionDisplay}
          location={locationDisplay}
          jobCount={total}
        />

        {/* Main content area */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-6 lg:px-8 py-10 ">
          {/* Job list — Suspense required because JobList is a client component using useSearchParams */}
          <Suspense
            fallback={
              <div className="py-10 text-center text-slate-400 text-sm">
                Loading jobs…
              </div>
            }
          >
            <JobList
              jobs={jobs}
              profession={professionDisplay}
              location={locationDisplay}
              total={total}
              sort={sort}
            />
          </Suspense>

          {/* Pagination */}
          <Suspense fallback={null}>
            <Pagination
              meta={{
                page,
                perPage: PER_PAGE,
                total,
                totalPages,
              }}
            />
          </Suspense>

          {/* Jobs in Other Cities */}
          <ProfessionCities
            profession={profession}
            professionDisplay={professionDisplay}
            cities={professionCities}
          />

          {/* Other professions in the searched city */}
          <CityProfessions
            location={location}
            locationDisplay={locationDisplay}
            professions={cityProfessions}
          />
        </div>
      </main>

      <NewDesignFooter />
    </>
  );
}
