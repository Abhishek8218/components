import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
var MonthModal = function (_a) {
    var month = _a.month, showMonthModal = _a.showMonthModal, handleMonthSelect = _a.handleMonthSelect, handleMonthModalClose = _a.handleMonthModalClose;
    return (<div className={"absolute bottom-0 min-h-fit top-8 inset-0 flex items-center justify-center max-w-[272px] max-h-[365px]  ml-4 mt-12 rounded shadow ".concat(showMonthModal ? '' : 'hidden')}>
    <div className="inset-0  bg-opacity-50" onClick={handleMonthModalClose}></div>
    <div className="bg-white rounded-lg min-w-[272px] h-[365px] p-4 relative">
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-bold text-gray-800">Select Month</h3>
        <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleMonthModalClose}/>
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-y-scroll max-h-[250px] custom-scrollbar ">
        {MONTH_NAMES.map(function (monthName, index) { return (<p key={index} onClick={function () { return handleMonthSelect(index); }} className={"cursor-pointer px-2 py-1 rounded-lg transition text-sm text-center  max-w-[200px] ".concat(index === month ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-300')}>
            {monthName}
          </p>); })}
      </div>
    </div>
  </div>);
};
export default MonthModal;
