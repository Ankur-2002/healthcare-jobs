'use client';

import { useEffect, useRef, useState } from 'react';
import {
  fetchApplicationStatus,
  getOrCreateApplicantKey,
  markJobAppliedInCache,
} from '@/lib/applicant';
import type { ApplicationUiStatus, Job } from '@/types';

export function useJobApplicationModal(
  activeJob: Job | null,
  onJobMarkedApplied?: (jobId: string) => void
) {
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationUiStatus>('unknown');
  const [appliedAt, setAppliedAt] = useState<string | undefined>();
  const onAppliedRef = useRef(onJobMarkedApplied);
  onAppliedRef.current = onJobMarkedApplied;

  useEffect(() => {
    if (!activeJob) return;

    let cancelled = false;
    setApplicationStatus('unknown');
    setAppliedAt(undefined);

    (async () => {
      try {
        const applicantKey = getOrCreateApplicantKey();
        const status = await fetchApplicationStatus(
          activeJob.jobId,
          applicantKey
        );
        if (cancelled) return;

        if (status.applied) {
          setApplicationStatus('applied');
          setAppliedAt(status.appliedAt);
          markJobAppliedInCache(activeJob.jobId);
          onAppliedRef.current?.(activeJob.jobId);
        } else {
          setApplicationStatus('not_applied');
        }
      } catch {
        if (!cancelled) setApplicationStatus('not_applied');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeJob?.jobId]);

  function handleApplySuccess(iso: string) {
    if (!activeJob) return;
    setApplicationStatus('applied');
    setAppliedAt(iso);
    markJobAppliedInCache(activeJob.jobId);
    onAppliedRef.current?.(activeJob.jobId);
  }

  return { applicationStatus, appliedAt, handleApplySuccess };
}
