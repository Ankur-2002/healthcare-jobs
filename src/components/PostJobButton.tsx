'use client';

import { useState } from 'react';
import PostJobModal from '@/components/PostJobModal';

interface PostJobButtonProps {
  id?: string;
  className?: string;
}

export default function PostJobButton({
  id = 'about-post-job-btn',
  className = 'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2',
}: PostJobButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        id={id}
        className={className}
        aria-label="Post a healthcare job"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Post a Job
      </button>

      <PostJobModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
