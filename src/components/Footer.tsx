import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'About', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-cyan-900 text-cyan-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row — Logo + tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 pb-8 border-b border-cyan-800">
          <div>
            <Link
              href="/"
              className="text-2xl font-heading font-700 text-white hover:text-cyan-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="HealthcareJobs — Go to homepage"
            >
              Healthcare<span className="text-cyan-400">Jobs</span>
            </Link>
            <p className="mt-1 text-sm text-cyan-300">
              India&apos;s trusted portal for healthcare careers.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cyan-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row — Copyright */}
        <p className="text-center text-xs text-cyan-400">
          © {currentYear} HealthcareJobs. All rights reserved. | Built for healthcare professionals across India.
        </p>
      </div>
    </footer>
  )
}
