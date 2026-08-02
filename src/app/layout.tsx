import type { Metadata } from 'next'
import { Figtree, Noto_Sans } from 'next/font/google'
import '@/app/globals.css'
import { generateSiteMetadata } from '@/lib/metadata'

// Design system fonts: Figtree (headings) + Noto Sans (body)
const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = generateSiteMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${notoSans.variable}`}>
      <body className="antialiased bg-cyan-50 text-cyan-900 font-body min-h-screen">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
