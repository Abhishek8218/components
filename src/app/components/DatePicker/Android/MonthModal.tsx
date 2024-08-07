import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { MONTH_NAMES } from '../constants';

interface MobileMonthModalProps {
  month: number;
  showMonthModal: boolean;
  handleMonthSelect: (selectedMonth: number) => void;
  handleMonthModalClose: () => void;
}

const MobileMonthModal: React.FC<MobileMonthModalProps> = ({
  month,
  showMonthModal,
  handleMonthSelect,
  handleMonthModalClose
}) => (
  <div className={`fixed inset-0 flex items-center justify-center z-50 px-10 ${showMonthModal ? '' : 'hidden'}`}>
    <div className="fixed inset-0 bg-opacity-60"></div> 
    <div className="bg-white rounded-lg p-4 relative z-10  min-w-[50vw] w-[80vw] max-w-md min-h-[50vh] max-h-[80vh]">
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
        onClick={handleMonthModalClose} // Call onClose to close the modal
      >
        <MaterialSymbol icon='close' fill size={32} color='gray' />
      </button>
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-bold text-gray-800">Select Month</h3>
      </div>
      <div className="grid grid-cols-2 gap-8 overflow-y-scroll max-h-[calc(80vh-80px)]  justify-center items-center text-center">
        {MONTH_NAMES.map((monthName, index) => (
          <p
            key={index}
            onClick={() => {
              handleMonthSelect(index);
              handleMonthModalClose(); // Close the modal when a month is selected
            }}
            className={`cursor-pointer px-2 py-1 rounded-lg transition text-sm text-center max-w-[200px] ${index === month ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {monthName}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default MobileMonthModal;
