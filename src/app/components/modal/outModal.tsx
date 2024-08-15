import { useState, useEffect } from 'react';
import InnerModal from './innerModal';

interface OuterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OuterModal: React.FC<OuterModalProps> = ({ isOpen, onClose }) => {
  const [isInnerModalOpen, setIsInnerModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handlePopstate = (event: PopStateEvent) => {
      if (event.state?.isInnerModalOpen) {
        setIsInnerModalOpen(false);
      } else if (event.state?.isOuterModalOpen) {
        onClose();
      }
    };

    // Push state to handle back navigation
    window.history.pushState({ isOuterModalOpen: true }, '', '');
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [isOpen, onClose]);

  const openInnerModal = () => {
    window.history.pushState({ isInnerModalOpen: true }, '', '');
    setIsInnerModalOpen(true);
  };

  const closeInnerModal = () => {
    window.history.back(); // This will trigger the `popstate` event and close the inner modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold mb-4">Outer Modal Title</h2>
        <p>This is the outer modal content.</p>
        <button
          onClick={openInnerModal}
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        >
          Open Inner Modal
        </button>
        <InnerModal isOpen={isInnerModalOpen} onClose={closeInnerModal} />
      </div>
    </div>
  );
};

export default OuterModal;
