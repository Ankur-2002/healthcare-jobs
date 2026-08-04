import Link from 'next/link';
import type { RelatedPage } from '@/types';
import { toTitleCase } from '@/lib/slug';

interface RelatedLinksProps {
  relatedPages: RelatedPage[];
  currentProfession: string;
}

export default function RelatedLinks({
  relatedPages,
  currentProfession,
}: RelatedLinksProps) {
  if (relatedPages.length === 0) return null;
  console.log(relatedPages, currentProfession, 'DATA_COMING');
  // Group related pages by profession
  const grouped = relatedPages.reduce<Record<string, RelatedPage[]>>(
    (acc, page) => {
      const key = page.profession;
      if (!acc[key]) acc[key] = [];
      acc[key].push(page);
      return acc;
    },
    {},
  );

  const professionGroups = Object.entries(grouped);

  // Sort: current profession's other cities first, then alphabetically
  professionGroups.sort(([a], [b]) => {
    if (a.toLowerCase() === currentProfession.toLowerCase()) return -1;
    if (b.toLowerCase() === currentProfession.toLowerCase()) return 1;
    return a.localeCompare(b);
  });

  return (
    <aside
      aria-label="Related job listings"
      className="mt-12 pt-10 border-t border-cyan-100"
    >
      <h2 className="text-xl font-heading font-700 text-cyan-900 mb-6">
        Explore More Healthcare Jobs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionGroups.map(([profession, pages]) => (
          <div key={profession}>
            <h3 className="text-sm font-heading font-700 text-cyan-800 uppercase tracking-wider mb-3 pb-2 border-b border-cyan-100">
              {toTitleCase(profession)} Jobs
            </h3>
            <ul className="space-y-1.5" role="list">
              {pages.slice(0, 8).map(page => (
                <li key={page.slug} role="listitem">
                  <Link
                    href={`/${page.slug}`}
                    className="flex items-center justify-between group text-sm text-cyan-700 hover:text-cyan-900 hover:underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded py-0.5"
                  >
                    <span>
                      {toTitleCase(profession)} Jobs in{' '}
                      {toTitleCase(page.location)}
                    </span>
                    <span className="ml-2 text-xs text-cyan-400 group-hover:text-cyan-600 shrink-0">
                      {page.jobCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
