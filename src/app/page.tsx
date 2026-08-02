import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getFeaturedProfessionLinks, getProfessions, getCities } from '@/services/jobs'
import { generateSlug, toTitleCase } from '@/lib/slug'
import PostJobCtaButton from '@/components/PostJobCtaButton'

export const revalidate = 3600

const PROFESSIONS = [
  { name: 'Nurse', icon: '🏥', description: 'Staff, ICU, OT nurses and more' },
  { name: 'Doctor', icon: '⚕️', description: 'General physicians, specialists' },
  { name: 'Pharmacist', icon: '💊', description: 'Clinical, retail pharmacists' },
  { name: 'Lab Technician', icon: '🔬', description: 'Pathology, radiology labs' },
  { name: 'Medical Coder', icon: '💻', description: 'ICD-10, CPT coding specialists' },
  { name: 'Physiotherapist', icon: '🦴', description: 'Rehab, ortho, neuro physio' },
]

const TOP_CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Noida']

export default async function HomePage() {
  // Try to get real data — if DB isn't configured yet, gracefully degrade
  let featuredLinks: Array<{ profession: string; location: string; slug: string; count: number }> = []
  let professions: string[] = []
  let cities: string[] = []

  try {
    ;[featuredLinks, professions, cities] = await Promise.all([
      getFeaturedProfessionLinks(),
      getProfessions(),
      getCities(),
    ])
  } catch {
    // DB not yet configured — show static placeholder content
  }

  const displayCities = cities.length > 0 ? cities : TOP_CITIES

  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section
          className="bg-gradient-to-br from-cyan-700 via-cyan-600 to-cyan-800 text-white py-16 sm:py-24"
          aria-labelledby="home-hero-heading"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-heading font-600 text-cyan-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Updated Daily — Fresh Listings Every Day
            </div>

            <h1
              id="home-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-white leading-tight mb-5"
            >
              Find Healthcare Jobs
              <span className="block text-cyan-300">Across India</span>
            </h1>

            <p className="text-lg sm:text-xl text-cyan-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Discover the latest Nurse, Doctor, Pharmacist, Lab Technician and Medical Coder jobs
              in top Indian cities. Apply directly — no registration needed.
            </p>

            {/* Quick profession pills */}
            <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Browse by profession">
              {(professions.length > 0 ? professions.slice(0, 6) : PROFESSIONS.map((p) => p.name)).map(
                (profession) => (
                  <Link
                    key={profession}
                    href={`/${generateSlug(profession, displayCities[0] ?? 'delhi')}`}
                    role="listitem"
                    className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-sm font-heading font-600 text-white hover:bg-white/30 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {toTitleCase(profession)}
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── BROWSE BY PROFESSION ──────────────────────────────────── */}
        <section className="py-14 sm:py-16 bg-white" aria-labelledby="profession-section-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="profession-section-heading" className="text-2xl sm:text-3xl font-heading font-700 text-cyan-900 mb-2">
              Browse by Profession
            </h2>
            <p className="text-cyan-600 font-body mb-8 text-sm sm:text-base">
              Explore healthcare jobs by your specialization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROFESSIONS.map((p) => {
                const cityForLink = displayCities[0] ?? 'Delhi'
                const slug = generateSlug(p.name, cityForLink)
                return (
                  <Link
                    key={p.name}
                    href={`/${slug}`}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-cyan-100 hover:border-cyan-300 hover:shadow-md hover:shadow-cyan-100 bg-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    aria-label={`Browse ${p.name} jobs`}
                  >
                    <span className="text-2xl" role="img" aria-hidden="true">{p.icon}</span>
                    <div>
                      <h3 className="font-heading font-600 text-cyan-900 group-hover:text-cyan-700 transition-colors duration-150">
                        {p.name} Jobs
                      </h3>
                      <p className="text-xs text-cyan-500 font-body mt-0.5">{p.description}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-cyan-300 group-hover:text-cyan-500 ml-auto mt-0.5 transition-colors duration-150"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FEATURED JOB LINKS ───────────────────────────────────── */}
        {featuredLinks.length > 0 && (
          <section className="py-14 sm:py-16 bg-cyan-50" aria-labelledby="featured-links-heading">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="featured-links-heading" className="text-2xl sm:text-3xl font-heading font-700 text-cyan-900 mb-2">
                Popular Job Categories
              </h2>
              <p className="text-cyan-600 font-body mb-8 text-sm sm:text-base">
                Top profession + city combinations with active listings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {featuredLinks.slice(0, 12).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <span className="text-sm font-body text-cyan-800 group-hover:text-cyan-600 transition-colors">
                      {toTitleCase(item.profession)} in {toTitleCase(item.location)}
                    </span>
                    <span className="ml-2 text-xs font-heading font-600 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BROWSE BY CITY ────────────────────────────────────────── */}
        <section className="py-14 sm:py-16 bg-white" aria-labelledby="cities-section-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="cities-section-heading" className="text-2xl sm:text-3xl font-heading font-700 text-cyan-900 mb-2">
              Jobs by City
            </h2>
            <p className="text-cyan-600 font-body mb-8 text-sm sm:text-base">
              Find healthcare opportunities in your city.
            </p>
            <div className="flex flex-wrap gap-3">
              {displayCities.slice(0, 12).map((city) => (
                <Link
                  key={city}
                  href={`/${generateSlug('nurse', city)}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-cyan-200 text-sm font-body text-cyan-700 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                  {toTitleCase(city)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────────────────── */}
        <section className="py-14 sm:py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl font-heading font-700 text-white mb-3">
              Hiring Healthcare Professionals?
            </h2>
            <p className="text-emerald-100 font-body mb-6 text-sm sm:text-base">
              Post your vacancy and reach thousands of qualified candidates across India.
              It takes less than 2 minutes.
            </p>
            <PostJobCtaButton />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
