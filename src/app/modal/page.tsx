'use client'

import { useState } from 'react';
import OuterModal from '../components/modal/outModal';

export default function Home() {
  const [isOuterModalOpen, setIsOuterModalOpen] = useState(false);

  const openOuterModal = () => setIsOuterModalOpen(true);
  const closeOuterModal = () => setIsOuterModalOpen(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={openOuterModal}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Open Outer Modal
      </button>
      <OuterModal isOpen={isOuterModalOpen} onClose={closeOuterModal} />
    </div>
  );
}
