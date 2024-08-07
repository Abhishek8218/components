import React, { useRef, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

interface YearModalProps {
  year: number;
  showYearModal: boolean;
  handleYearSelect: (selectedYear: number) => void;
  handleYearModalClose: () => void;
}

const YearModal: React.FC<YearModalProps> = ({
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
    <div className="inset-0 flex items-center justify-center mt-[2px] w-[272px] h-[270px] no-scrollbar">
    <div ref={yearModalRef} className="bg-gray-100 rounded-lg w-[272px] h-[270px] p-4  no-scrollbar">
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-semibold">Select Year</h3>
        <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleYearModalClose} />
      </div>
      <div className="grid grid-cols-3 overflow-y-scroll custom-scrollbar max-h-[150px]">
        {Array.from({ length: 61 }, (_, i) => new Date().getFullYear() - 60 + i).map(yearOption => (
          <p
            key={yearOption}
            data-year={yearOption}
            onClick={() => handleYearSelect(yearOption)}
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

export default YearModal;
