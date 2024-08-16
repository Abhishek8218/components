'use client'


import { useRecoilValue } from "recoil";
import OuterModal from "../components/modal/modals/outModal";
import { useModal,modalStackState } from "../components/modal/useModalStackHook/useModal";

export default function Home() {
  const modalStack = useRecoilValue(modalStackState);
  const { openModal } = useModal();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => openModal('outerModal')}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Open Outer Modal
      </button>
      <OuterModal isOpen={modalStack.includes('outerModal')} />
    </div>
  );
}
