'use client';
import React, { useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
var MobileMonthModal = function (_a) {
    var month = _a.month, showMonthModal = _a.showMonthModal, handleMonthSelect = _a.handleMonthSelect, handleMonthModalClose = _a.handleMonthModalClose, setCurrentMonth = _a.setCurrentMonth;
    useEffect(function () {
        // Disable scrolling on the background
        document.body.style.overflow = 'hidden';
        return function () {
            // Re-enable scrolling when the modal is closed
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (<div className={"fixed inset-0 flex items-center justify-center z-50 px-10 ".concat(showMonthModal ? '' : 'hidden')}>
    <div className="fixed inset-0 bg-opacity-60"></div> 
    <div className="bg-white rounded-lg shadow p-4 relative z-1  w-[354px] h-[528px] min-h-[528px] min-w-[354px] max-h-[528px] max-w-[354px]">

        <div className=''>
      <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-150" onClick={handleMonthModalClose} // Call onClose to close the modal
    >
        <MaterialSymbol icon='close' fill size={32} color='gray'/>
      </button>
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-bold text-gray-800">Select Month</h3>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-10 overflow-y-scroll max-h-[calc(80vh-80px)] min-h-[375px]  justify-center items-center text-center">
        {MONTH_NAMES.map(function (monthName, index) { return (<p key={index} onClick={function () {
                handleMonthSelect(index);
                handleMonthModalClose(); // Close the modal when a month is selected
            }} className={"cursor-pointer px-2 py-1 rounded-lg transition text-sm text-center max-w-[200px] ".concat(index === month ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}>
            {monthName}
          </p>); })}
      </div>
      <div className='flex justify-center border-t border-gray-100 w-full mt-5'>
    <button className='text-blue-500  pt-2' onClick={setCurrentMonth}>Set Current Month</button>
      </div>
    </div>
    </div>
  </div>);
};
export default MobileMonthModal;
