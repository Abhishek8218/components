'use client';
import React, { useEffect } from 'react';
import { DAYS, MONTH_NAMES } from '../../DatePicker/constants';
import { MaterialSymbol } from 'react-material-symbols';
import { isBefore } from 'date-fns';
var MobileDateModal = function (_a) {
    var month = _a.month, year = _a.year, blankDays = _a.blankDays, noOfDays = _a.noOfDays, handleDateSelection = _a.handleDateSelection, isToday = _a.isToday, isBanned = _a.isBanned, isImportant = _a.isImportant, setStartDate = _a.setStartDate, setEndDate = _a.setEndDate, setMonth = _a.setMonth, setYear = _a.setYear, handleMonthModal = _a.handleMonthModal, handleYearModal = _a.handleYearModal, startDate = _a.startDate, endDate = _a.endDate, onConfirm = _a.onConfirm, onReset = _a.onReset, handleDateRangerClose = _a.handleDateRangerClose, setIsSelectingStartDate = _a.setIsSelectingStartDate;
    var handleDateClick = function (date) {
        handleDateSelection(date);
    };
    var isDateInRange = function (date) {
        if (startDate && endDate) {
            var _a = startDate.split('-').map(Number), startDay = _a[0], startMonth = _a[1], startYear = _a[2];
            var _b = endDate.split('-').map(Number), endDay = _b[0], endMonth = _b[1], endYear = _b[2];
            var parsedStartDate = new Date(startYear, startMonth - 1, startDay);
            var parsedEndDate = new Date(endYear, endMonth - 1, endDay);
            var currentDate = new Date(year, month, date);
            return currentDate >= parsedStartDate && currentDate <= parsedEndDate;
        }
        return false;
    };
    var DateArranger = function (_a) {
        var endDate = _a.endDate, startDate = _a.startDate, setStartDate = _a.setStartDate, setEndDate = _a.setEndDate, setIsSelectingStartDate = _a.setIsSelectingStartDate;
        if (endDate) {
            var _b = startDate.split('-').map(Number), startDay = _b[0], startMonth = _b[1], startYear = _b[2];
            var _c = endDate.split('-').map(Number), endDay = _c[0], endMonth = _c[1], endYear = _c[2];
            var parsedStartDate = new Date(startYear, startMonth - 1, startDay);
            var parsedEndDate = new Date(endYear, endMonth - 1, endDay);
            if (isBefore(parsedEndDate, parsedStartDate)) {
                setStartDate(endDate);
                setEndDate(startDate);
                setIsSelectingStartDate(false);
            }
        }
    };
    React.useEffect(function () {
        DateArranger({ endDate: endDate, startDate: startDate, setStartDate: setStartDate, setEndDate: setEndDate, setIsSelectingStartDate: setIsSelectingStartDate });
    }, [endDate, startDate]);
    var isStartEndDate = function (date) {
        if (startDate || endDate) {
            // Parse the start and end dates into Date objects
            var _a = startDate.split('-').map(Number), startDay = _a[0], startMonth = _a[1], startYear = _a[2];
            var _b = endDate.split('-').map(Number), endDay = _b[0], endMonth = _b[1], endYear = _b[2];
            var parsedStartDate = new Date(startYear, startMonth - 1, startDay);
            var parsedEndDate = new Date(endYear, endMonth - 1, endDay);
            var currentDate = new Date(year, month, date);
            // Compare the current date with the parsed start and end dates
            var isStart = currentDate.getTime() === parsedStartDate.getTime();
            var isEnd = currentDate.getTime() === parsedEndDate.getTime();
            return isStart || isEnd;
        }
        return false;
    };
    console.log("Final Start Date", startDate, "FInal End Date", endDate);
    useEffect(function () {
        // Disable scrolling on the background
        document.body.style.overflow = 'hidden';
        return function () {
            // Re-enable scrolling when the modal is closed
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (<div className="fixed bottom-0 inset-0 flex items-center justify-center z-50 px-10">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow p-4 relative z-1 w-[354px] h-[528px] min-h-[528px] min-w-[354px] max-h-[528px] max-w-[354px]">
        <div className="flex justify-between items-center mb-2">
                <div>
                    <span className="text-lg font-bold text-gray-800 cursor-pointer" onClick={handleMonthModal}>{MONTH_NAMES[month]}</span>
                    <span className="ml-1 text-lg text-gray-600 font-normal cursor-pointer" onClick={handleYearModal}>{year}</span>
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
                    <button type="button" className="inline-flex text-gray-500 hover:text-gray-700 transition ease-in-out duration-150 hover:bg-gray-200 p-1 rounded-full" onClick={handleDateRangerClose}>
                        <MaterialSymbol icon='close' fill size={32} color='gray'/>
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-1">
                {DAYS.map(function (day, index) { return (<div key={index} className="px-1" style={{ width: '14.26%' }}>
                        <span className="text-gray-800 font-medium text-center text-xs">{day}</span>
                    </div>); })}
            </div>
            <div className="flex flex-wrap -mx-1 min-h-[295px]">
                {blankDays.map(function (_, index) { return (<div key={index} className="text-center border p-1 border-transparent text-sm" style={{ width: '14.28%' }}></div>); })}
                {noOfDays.map(function (date, dateIndex) { return (<div key={dateIndex} className="px-1 mb-1" style={{ width: '14.28%' }}>
  <div onClick={function () { return handleDateClick(date); }} className={"cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 ".concat(isStartEndDate(date)
                ? 'bg-blue-700 text-white' // Highlight start date with darker color
                : isDateInRange(date)
                    ? 'bg-blue-200' // Highlight dates in range
                    : isToday(date)
                        ? 'bg-blue-500 text-white' // Highlight today
                        : isBanned(date)
                            ? 'bg-gray-400 text-white cursor-not-allowed' // Highlight banned dates
                            : isImportant(date)
                                ? 'bg-green-300 text-gray-700' // Highlight important dates
                                : 'text-gray-700 hover:bg-blue-200' // Default date styling
            )}>
                            {date}
                        </div>
                    </div>); })}
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className='text-center'>
                    <span className="font-semibold text-center text-gray-500">Start Date: </span><br /> {startDate ? <span className='text-xs block'>{startDate}</span> : <span className="text-xs block"><br />Start Date</span>}
                </div>
                <div className='text-center'>
                    <span className="font-semibold text-center text-gray-500">End Date:</span><br />{endDate ? <span className='text-xs block'>{endDate}</span> : <span className="text-xs  block"><br />End Date</span>}
                </div>
            </div>
            <div className="mt-4 flex justify-center items-center gap-10 pt-2  border-t border-gray-200">
                <button className=" text-blue-500 rounded hover:scale-105 transition ease-in-out duration-100" onClick={onConfirm}>
                    Confirm
                </button>
                <button className=" text-red-500 rounded hover:scale-105 transition ease-in-out duration-100" onClick={onReset}>
                    Reset
                </button>
            </div>
        </div>
        </div>);
};
export default MobileDateModal;
