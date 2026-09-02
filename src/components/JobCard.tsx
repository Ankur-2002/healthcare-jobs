'use client';

import { useEffect, useRef, useState } from 'react';
import type { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/* ── Job Detail Modal ─────────────────────────────────────────────────────── */
function JobDetailModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const relativeDate = formatRelativeDate(job.postedDate);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  /* Close on backdrop click */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    /* Overlay */
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Job details for ${job.title}`}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100 animate-fade-in-up"
        style={{ animationDuration: '0.22s' }}
      >
        {/* Header gradient band */}
        <div
          className="sticky top-0 z-10 px-6 py-5 rounded-t-2xl flex items-start justify-between gap-4"
          style={{
            background:
              'linear-gradient(135deg,#0a2540 0%,#0d3460 40%,#1a4d80 70%,#0f3d6e 100%)',
          }}
        >
          <div className="flex-1 min-w-0">
            {/* Category pill */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 mb-2">
              {job.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
              {job.title}
            </h2>
            <p className="mt-1 text-indigo-100 text-sm font-body font-semibold">
              {job.company}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            id={`close-job-modal-${job.id}`}
            aria-label="Close job details"
            className="shrink-0 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 active:bg-white/25 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Meta chips row */}
          <div className="flex flex-wrap gap-2">
            {/* Location */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 text-indigo-400 shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              {job.location}
            </span>

            {/* Profession */}
            {job.profession && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                </svg>
                {job.profession}
              </span>
            )}

            {/* Posted date */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clipRule="evenodd"
                />
              </svg>
              Posted {relativeDate}
            </span>
          </div>

          {/* Divider */}
          <hr className="border-slate-100" />

          {/* Description */}
          <div>
            <h3 className="text-sm font-heading font-bold text-slate-700 uppercase tracking-wide mb-2">
              Job Description
            </h3>
            <p className="text-sm text-slate-600 font-body leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Divider */}
          <hr className="border-slate-100" />

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-400 font-body">
              You will be redirected to the employer&apos;s site to complete
              your application.
            </p>
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              id={`apply-job-btn-${job.id}`}
              aria-label={`Apply for ${job.title} at ${job.company}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-semibold font-body shadow-md shadow-emerald-200 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Apply Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Job Card ─────────────────────────────────────────────────────────────── */
export default function JobCard({ job }: JobCardProps) {
  const relativeDate = formatRelativeDate(job.postedDate);
  const shortDescription = truncateDescription(job.description);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article
        className="group bg-white rounded-xl border border-slate-200 p-5 sm:p-6 hover:bg-slate-50 transition-colors duration-150 cursor-default
        hover:shadow-lg hover:shadow-cyan-100 transition-all duration-200 cursor-default animate-fade-in-up"
        aria-label={`${job.title} at ${job.company}`}
      >
        {/* Outer row: left content | right actions */}
        <div className="flex items-start justify-between gap-6">
          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            {/* Category pill */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {job.category}
              </span>
            </div>

            {/* Job title */}
            <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors duration-150 truncate">
              {job.title}
            </h2>

            {/* Employer name */}
            <p className="text-sm font-semibold text-slate-700 font-body">
              {job.company}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-slate-500 font-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 text-slate-400 shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{job.location}</span>
            </div>

            {/* Short description */}
            <p className="text-sm text-slate-500 font-body leading-relaxed mt-0.5">
              {shortDescription}
            </p>
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-end justify-between gap-4 shrink-0 self-stretch">
            {/* Posted date */}
            <time
              dateTime={new Date(job.postedDate).toISOString()}
              className="text-xs text-slate-400 font-body whitespace-nowrap"
            >
              Posted {relativeDate}
            </time>

            {/* View Job button — now opens modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              id={`view-job-btn-${job.id}`}
              aria-label={`View job details: ${job.title} at ${job.company}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 text-sm font-semibold font-body hover:bg-emerald-50 hover:border-emerald-600 active:bg-emerald-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              View Job
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </article>

      {/* Job Detail Modal */}
      {isModalOpen && (
        <JobDetailModal job={job} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
