import React, { useRef, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

interface MobileYearModalProps {
  year: number;
  showYearModal: boolean;
  handleYearSelect: (selectedYear: number) => void;
  handleYearModalClose: () => void;
}

const MobileYearModal: React.FC<MobileYearModalProps> = ({
  year,
  showYearModal,
  handleYearSelect,
  handleYearModalClose
}) => {
  const yearModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showYearModal && yearModalRef.current) {
      const yearElement = yearModalRef.current.querySelector(`p[data-year='${year}']`);
      if (yearElement) {
        yearElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [showYearModal, year]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${showYearModal ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div ref={yearModalRef} className="bg-white rounded-lg p-4 relative z-10 min-w-[80vw]  max-h-[50vh] ">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
          onClick={handleYearModalClose} // Close modal when clicked
        >
          <MaterialSymbol icon='close' fill size={32} color='gray' />
        </button>
        <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
          <h3 className="text-lg font-semibold">Select Year</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 overflow-y-scroll max-h-[350px]">
          {Array.from({ length: 61 }, (_, i) => new Date().getFullYear() - 60 + i).map(yearOption => (
            <p
              key={yearOption}
              data-year={yearOption}
              onClick={() => {
                handleYearSelect(yearOption);
                handleYearModalClose(); // Close modal when a year is selected
              }}
              className={`m-1 px-2 py-1 rounded-lg transition text-sm duration-200 text-center ${yearOption === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {yearOption}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileYearModal;
