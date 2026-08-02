'use client'

export default function PostJobCtaButton() {
  return (
    <button
      id="home-post-job-cta"
      onClick={() => {
        document.getElementById('post-job-header-btn')?.click()
      }}
      className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-emerald-700 text-base font-heading font-700 hover:bg-emerald-50 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
    >
      Post a Job — Free
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
      </svg>
    </button>
  )
}
