import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { MONTH_NAMES } from '../constants';

interface MonthModalProps {
  month: number;
  showMonthModal: boolean;
  handleMonthSelect: (selectedMonth: number) => void;
  handleMonthModalClose: () => void;
}

const MonthModal = ({
  month,
  showMonthModal,
  handleMonthSelect,
  handleMonthModalClose
}:MonthModalProps) => (
  <div className={` inset-0 flex items-center justify-center max-w-[272px] max-h-[270px]  ml-4 mt-2 ${showMonthModal ? '' : 'hidden'}`}>
    <div className="inset-0  bg-opacity-50" onClick={handleMonthModalClose}></div>
    <div className="bg-white rounded-lg min-w-[272px] h-[270px] p-4 relative">
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-bold text-gray-800">Select Month</h3>
        <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleMonthModalClose} />
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-y-scroll max-h-[200px] custom-scrollbar ">
        {MONTH_NAMES.map((monthName, index) => (
          <p
            key={index}
            onClick={() => handleMonthSelect(index)}
            className={`cursor-pointer px-2 py-1 rounded-lg transition text-sm text-center  max-w-[200px] ${index === month ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {monthName}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default MonthModal;