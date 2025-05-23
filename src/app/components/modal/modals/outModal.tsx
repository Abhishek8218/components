import InnerModal from './innerModal';
import { useModal } from '../useModalStackHook/useModal'; // Import the custom modal hook

interface OuterModalProps {
  isOpen: boolean; // Determines if the outer modal should be shown initially
}

const OuterModal: React.FC<OuterModalProps> = ({ isOpen }) => {
  const { openModal, closeModal, modalStack } = useModal(); // Use the hook to access modal logic

  // If the outer modal shouldn't be visible, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        {/* Close button (top-right corner) */}
        <button
          onClick={closeModal}    
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
              d="M6 18L18 6M6 6l12 12" // Cross icon
            />
          </svg>
        </button>

        {/* Modal content */}
        <h2 className="text-lg font-bold mb-4">Outer Modal Title</h2>
        <p>This is the outer modal content.</p>

        {/* Button to open the inner modal */}
        <button
          onClick={() => openModal('innerModal')} // Push innerModal ID to stack and history
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        >
          Open Inner Modal
        </button>

        {/* Conditionally render InnerModal only if its ID is in the modal stack */}
        {modalStack.includes('innerModal') && (
          <InnerModal isOpen={modalStack.includes('innerModal')} />
        )}
      </div>
    </div>
  );
};

export default OuterModal;
