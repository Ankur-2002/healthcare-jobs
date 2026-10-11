'use client';

import { useCallback, useEffect, useState } from 'react';
import { JobDetailModal } from '@/components/JobDetailModal';
import { useJobApplicationModal } from '@/hooks/useJobApplicationModal';
import { isJobAppliedInCache } from '@/lib/applicant';
import type { Job } from '@/types';

function timeAgoShort(date: Date | string): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD = Math.floor(diffH / 24);
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  return `${diffD}d ago`;
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3 h-3 text-slate-400 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface LatestJobsGridProps {
  jobs: Job[];
}

export default function LatestJobsGrid({ jobs }: LatestJobsGridProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const fromCache = jobs
      .filter(j => isJobAppliedInCache(j.jobId))
      .map(j => j.jobId);
    if (fromCache.length > 0) {
      setAppliedJobIds(prev => new Set([...prev, ...fromCache]));
    }
  }, [jobs]);

  const markJobApplied = useCallback((jobId: string) => {
    setAppliedJobIds(prev => new Set(prev).add(jobId));
  }, []);

  const { applicationStatus, appliedAt, handleApplySuccess } =
    useJobApplicationModal(selectedJob, markJobApplied);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {jobs.map(job => {
          const timeAgo = timeAgoShort(job.postedDate);
          const hasApplied = appliedJobIds.has(job.jobId);

          return (
            <button
              key={job.jobId ?? job.id}
              onClick={() => setSelectedJob(job)}
              id={`latest-job-card-${job.id}`}
              aria-label={`View details: ${job.title} at ${job.company}`}
              className="group text-left flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 min-h-[220px] cursor-pointer transition-all duration-200 hover:border-sky-600 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="flex flex-wrap gap-1.5 min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      {job.profession}
                    </span>
                    {hasApplied && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        Applied
                      </span>
                    )}
                  </div>
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
            </button>
          );
        })}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          applicationStatus={applicationStatus}
          appliedAt={appliedAt}
          onClose={() => setSelectedJob(null)}
          onApplySuccess={handleApplySuccess}
        />
      )}
    </>
  );
}
