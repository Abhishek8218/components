import React, { useRef, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var YearModal = function (_a) {
    var year = _a.year, showYearModal = _a.showYearModal, handleYearSelect = _a.handleYearSelect, handleYearModalClose = _a.handleYearModalClose, setCurrentYear = _a.setCurrentYear;
    var yearModalRef = useRef(null);
    useEffect(function () {
        if (showYearModal && yearModalRef.current) {
            var yearElement = yearModalRef.current.querySelector("p[data-year='".concat(year, "']"));
            if (yearElement) {
                yearElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [showYearModal, year]);
    return (<div className="inset-0 flex items-center justify-center mt-[10px] w-[272px] h-[335px] no-scrollbar ">
    <div ref={yearModalRef} className="bg-gray-100 rounded-lg w-[272px] h-[335px] p-4  no-scrollbar">
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-semibold">Select Year</h3>
        <div className='flex justify-center items-center gap-1'>
  
    <button className='text-blue-500 text-sm  ' onClick={setCurrentYear}>Current</button>
 
     
       
        <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleYearModalClose}/>
        </div>
      </div>
      <div className="grid grid-cols-3 overflow-y-scroll custom-scrollbar max-h-[250px]">
        {Array.from({ length: 61 }, function (_, i) { return new Date().getFullYear() - 60 + i; }).map(function (yearOption) { return (<p key={yearOption} data-year={yearOption} onClick={function () { return handleYearSelect(yearOption); }} className={"m-1 px-2 py-1 rounded-lg transition text-sm duration-200 text-center ".concat(yearOption === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}>
            {yearOption}
          </p>); })}
      </div>
    </div>
  </div>);
};
export default YearModal;
