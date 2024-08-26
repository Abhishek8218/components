import React from "react";
import { DAYS, MONTH_NAMES } from "../constants";
var DateModal = function (_a) {
    var month = _a.month, year = _a.year, selectedate = _a.selectedate, blankDays = _a.blankDays, noOfDays = _a.noOfDays, getDateValue = _a.getDateValue, isToday = _a.isToday, isBanned = _a.isBanned, isImportant = _a.isImportant, setMonth = _a.setMonth, setYear = _a.setYear, handleMonthModal = _a.handleMonthModal, handleYearModal = _a.handleYearModal, onConfirm = _a.onConfirm, onReset = _a.onReset, handleDateClick = _a.handleDateClick, SelectedDate = _a.SelectedDate, setcurrentDay = _a.setcurrentDay, activeDate = _a.activeDate;
    return (console.log("DateModal", selectedate),
        console.log("activeDate", activeDate),
        (
        // console.log('SelectedDate', SelectedDate),
        <div className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0" style={{ width: "17rem" }}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-lg font-bold text-gray-800 cursor-pointer" onClick={handleMonthModal}>
            {MONTH_NAMES[month]}
          </span>
          <span className="ml-1 text-lg text-gray-600 font-normal cursor-pointer" onClick={handleYearModal}>
            {year}
          </span>
        </div>
        <div className='flex flex-row justify-center items-center'>
          <button type="button" className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full" onClick={function () {
                if (month === 0) {
                    setYear(year - 1);
                    setMonth(11);
                }
                else {
                    setMonth(month - 1);
                }
            }}>
            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className='flex justify-center border-t border-gray-100 w-full'>
          <button className='text-blue-500' onClick={setcurrentDay}>Today</button>

        </div>
          <button type="button" className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full" onClick={function () {
                if (month === 11) {
                    setYear(year + 1);
                    setMonth(0);
                }
                else {
                    setMonth(month + 1);
                }
            }}>
            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map(function (day, index) { return (<div key={index} className="px-1" style={{ width: "14.26%" }}>
            <span className="text-gray-800 font-medium text-center text-xs">
              {day}
            </span>
          </div>); })}
      </div>
      <div className="flex flex-wrap -mx-1 min-h-48">
        {blankDays.map(function (_, index) { return (<div key={index} className="text-center border p-1 border-transparent text-sm" style={{ width: "14.28%" }}></div>); })}
        {noOfDays.map(function (date, dateIndex) { return (<div key={dateIndex} className="px-1 mb-1" style={{ width: "14.28%" }}>
            <div onClick={function () { return handleDateClick(date); }} className={"cursor-pointer text-center text-sm l rounded-full leading-loose transition ease-in-out duration-100 ".concat(selectedate === activeDate && SelectedDate === date
                    ? "bg-blue-500 text-white"
                    : isToday(date)
                        ? "bg-blue-300 text-white"
                        : isBanned(date)
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : isImportant(date)
                                ? "bg-green-300 text-gray-700"
                                : "text-gray-700 hover:bg-blue-200")}>
              {date}
            </div>
          </div>); })}
      </div>
      <div className="flex justify-between w-full pt-2 px-2  border-t border-gray-200">
        <button className={"  rounded hover:scale-105 transition ease-in-out duration-100 ".concat(selectedate
                ? " text-blue-500 cursor-pointer"
                : "cursor-not-allowed disabled text-gray-300")} onClick={onConfirm}>
          Confirm
        </button>
        <button className={"  rounded hover:scale-105 transition ease-in-out duration-100 ".concat(selectedate
                ? " text-red-500 cursor-pointer"
                : "cursor-not-allowed disabled text-gray-300")} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>));
};
export default DateModal;
