// components/modal/useModalStackHook/modal.tsx
import React from 'react';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg relative">
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">X</button>
      {children}
    </div>
  </div>
);

export default Modal;
