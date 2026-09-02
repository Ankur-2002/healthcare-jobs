'use client';

import { useState } from 'react';
import PostJobModal from '@/components/PostJobModal';

export default function PostJobCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        id="nd-cta-post-btn"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-7 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 cursor-pointer"
      >
        Post a Job — Free →
      </button>

      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
