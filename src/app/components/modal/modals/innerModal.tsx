// components/modal/InnerModal.tsx

import ThirdLevelModal from "./thirdModal";
import { useModal } from "../useModalStackHook/useModal";


interface InnerModalProps {
  isOpen: boolean;
}

const InnerModal = ({ isOpen }:InnerModalProps) => {
  const { closeModal, modalStack, openModal } = useModal();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold mb-4">Inner Modal Title</h2>
        <p>This is the inner modal content.</p>
        <button
          onClick={() => openModal('thirdLevelModal')}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Open Third Level Modal
        </button>
        {modalStack.includes('thirdLevelModal') && <ThirdLevelModal isOpen={modalStack.includes('thirdLevelModal')} />}
      </div>
    </div>
  );
};

export default InnerModal;