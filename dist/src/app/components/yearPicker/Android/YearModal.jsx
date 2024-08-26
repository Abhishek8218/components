'use client';
import React, { useRef, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var MobileYearModal = function (_a) {
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
    useEffect(function () {
        // Disable scrolling on the background
        document.body.style.overflow = 'hidden';
        return function () {
            // Re-enable scrolling when the modal is closed
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (<div className={"fixed inset-0 flex items-center justify-center z-50 ".concat(showYearModal ? '' : 'hidden')}>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div ref={yearModalRef} className="bg-white rounded-lg shadow p-4 relative z-1  w-[354px] h-[528px] min-h-[528px] min-w-[354px] max-h-[528px] max-w-[354px] ">
        <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-150" onClick={handleYearModalClose} // Close modal when clicked
    >
          <MaterialSymbol icon='close' fill size={32} color='gray'/>
        </button>
        <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
          <h3 className="text-lg font-semibold">Select Year</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 overflow-y-scroll min-h-[375px] max-h-[390px]">
          {Array.from({ length: 61 }, function (_, i) { return new Date().getFullYear() - 60 + i; }).map(function (yearOption) { return (<p key={yearOption} data-year={yearOption} onClick={function () {
                handleYearSelect(yearOption);
                handleYearModalClose(); // Close modal when a year is selected
            }} className={"m-1 px-2 py-1 rounded-lg transition text-sm duration-200 text-center ".concat(yearOption === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}>
              {yearOption}
            </p>); })}
        </div>
        <div className='flex justify-center border-t border-gray-100 w-full mt-5'>
    <button className='text-blue-500  pt-2' onClick={setCurrentYear}>Set Current Year</button>
      </div>
      </div>
    </div>);
};
export default MobileYearModal;
