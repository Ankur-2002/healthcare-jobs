'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { PaginationMeta } from '@/types'

interface PaginationProps {
  meta: PaginationMeta
}

export default function Pagination({ meta }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { page, totalPages } = meta

  const createPageUrl = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams(searchParams.toString())
      if (pageNum === 1) {
        params.delete('page')
      } else {
        params.set('page', String(pageNum))
      }
      const query = params.toString()
      return `${pathname}${query ? `?${query}` : ''}`
    },
    [pathname, searchParams]
  )

  const navigateTo = (pageNum: number) => {
    router.push(createPageUrl(pageNum), { scroll: true })
  }

  if (totalPages <= 1) return null

  // Build page number array with ellipsis logic (max 7 visible buttons)
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | 'ellipsis')[] = [1]

    if (page > 3) pages.push('ellipsis')

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (page < totalPages - 2) pages.push('ellipsis')

    pages.push(totalPages)

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      aria-label="Job listings pagination"
      className="flex justify-center mt-10"
    >
      <ul className="flex flex-wrap items-center gap-1.5" role="list">
        {/* Previous */}
        <li>
          <button
            id="pagination-prev"
            onClick={() => navigateTo(page - 1)}
            disabled={page === 1}
            aria-label="Go to previous page"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 010 1.06L8.06 10l3.72 3.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((num, idx) =>
          num === 'ellipsis' ? (
            <li key={`ellipsis-${idx}`} aria-hidden="true">
              <span className="flex items-center justify-center w-10 h-10 text-cyan-400 font-body text-sm select-none">
                …
              </span>
            </li>
          ) : (
            <li key={num}>
              <button
                id={`pagination-page-${num}`}
                onClick={() => navigateTo(num)}
                aria-label={`Go to page ${num}`}
                aria-current={num === page ? 'page' : undefined}
                className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-heading font-600 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  num === page
                    ? 'bg-cyan-600 text-white border border-cyan-600 shadow-sm'
                    : 'border border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400'
                }`}
              >
                {num}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li>
          <button
            id="pagination-next"
            onClick={() => navigateTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Go to next page"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}
