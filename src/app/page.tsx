// src/app/page.tsx
// Delegates to the new-design page. Original implementation preserved in git history.

export const revalidate = 3600; // must be declared directly — Next.js cannot parse re-exports

export { default } from './new-design/page';
