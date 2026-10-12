// types/index.ts — Shared TypeScript types across the project.
// Import from here. Never use 'any'.

export interface Job {
  id: number;
  jobId: string;
  title: string;
  slug: string;
  profession: string;
  location: string;
  description: string;
  applyLink: string;
  company: string;
  category: string;
  postedDate: Date;
  isApplicationControl: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface RelatedPage {
  slug: string;
  profession: string;
  location: string;
  jobCount: number;
}

export type ApplicationUiStatus = 'unknown' | 'not_applied' | 'applied';

export interface ApplicationStatusResponse {
  applied: boolean;
  appliedAt?: string;
}

export interface ApplicationSubmitResponse {
  ok: boolean;
  appliedAt: string;
}

export interface JobsPageData {
  jobs: Job[];
  pagination: PaginationMeta;
  relatedPages: RelatedPage[];
  professionDisplay: string;
  locationDisplay: string;
}
