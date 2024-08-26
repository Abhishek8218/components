import React, { useRef, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var YearModal = function (_a) {
    var year = _a.year, showYearModal = _a.showYearModal, handleYearSelect = _a.handleYearSelect, handleYearModalClose = _a.handleYearModalClose;
    var yearModalRef = useRef(null);
    useEffect(function () {
        if (showYearModal && yearModalRef.current) {
            var yearElement = yearModalRef.current.querySelector("p[data-year='".concat(year, "']"));
            if (yearElement) {
                yearElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [showYearModal, year]);
    return (<div className="absolute bottom-0 min-h-fit top-8 inset-0 flex items-center justify-center mt-12 w-[272px] h-[365px] no-scrollbar shadow rounded">
    <div ref={yearModalRef} className="bg-white rounded-lg w-[272px] h-[365px] p-4  no-scrollbar">
      <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
        <h3 className="text-lg font-semibold">Select Year</h3>
        <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleYearModalClose}/>
      </div>
      <div className="grid grid-cols-3 overflow-y-scroll custom-scrollbar max-h-[250px]">
        {Array.from({ length: 61 }, function (_, i) { return new Date().getFullYear() - 60 + i; }).map(function (yearOption) { return (<p key={yearOption} data-year={yearOption} onClick={function () { return handleYearSelect(yearOption); }} className={"m-1 px-2 py-1 rounded-lg transition text-sm duration-200 text-center ".concat(yearOption === year ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-300')}>
            {yearOption}
          </p>); })}
      </div>
    </div>
  </div>);
};
export default YearModal;
