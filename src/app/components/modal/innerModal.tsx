import { useEffect } from 'react';

interface InnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InnerModal: React.FC<InnerModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handlePopstate = (event: PopStateEvent) => {
      if (event.state?.isInnerModalOpen) {
        onClose();
      }
    };

    // Push state to handle back navigation
    window.history.pushState({ isInnerModalOpen: true }, '', '');
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [isOpen, onClose]);

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
        <h2 className="text-lg font-bold mb-4">Inner Modal Title</h2>
        <p>This is the inner modal content.</p>
      </div>
    </div>
  );
};

export default InnerModal;
