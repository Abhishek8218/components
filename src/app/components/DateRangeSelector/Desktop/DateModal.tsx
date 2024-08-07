import React from 'react';
import { DAYS, MONTH_NAMES } from '../../DatePicker/constants';
import { MaterialSymbol } from 'react-material-symbols';
import { format } from 'date-fns';

interface DateModalProps {
    month: number;
    year: number;
    blankDays: number[];
    noOfDays: number[];
    handleDateSelection: (date: number) => void;
    isToday: (date: number) => boolean;
    isBanned: (date: number) => boolean;
    isImportant: (date: number) => boolean;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    handleMonthModal: () => void;
    handleYearModal: () => void;
    startDate: string;
    endDate: string;
    onConfirm: () => void;
    onReset: () => void;
    handleDateRangerClose: () => void;
  }
  
  const DateModal = ({
    month,
    year,
    blankDays,
    noOfDays,
    handleDateSelection,
    isToday,
    isBanned,
    isImportant,
    setMonth,
    setYear,
    handleMonthModal,
    handleYearModal,
    startDate,
    endDate,
    onConfirm,
    onReset,
    handleDateRangerClose
  }: DateModalProps) => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    const handleDateClick = (date: number) => {
      handleDateSelection(date);
    };
  
    const isDateInRange = (date: number) => {
      if (start && end) {
        const current = new Date(year, month, date);
        return current >= start && current <= end;
      }
      return false;
    };


    // const formatDate = (date: Date | null) => {
    //     if (!date) return '';
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `${day}-${month}-${year}`;
    // };
    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return format(date, 'dd-MM-yyyy');
    };
  
    console.log("start date is ",startDate);
    console.log("end date is ",endDate);


console.log("formatted start date is ",formatDate(start));
console.log("formatted end date is ",formatDate(end));


    return (
      <div className="bg-white mt-12 rounded-lg shadow p-4  top-0 left-0" style={{ width: '17rem' }}>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-lg font-bold text-gray-800 cursor-pointer" onClick={handleMonthModal}>{MONTH_NAMES[month]}</span>
            <span className="ml-1 text-lg text-gray-600 font-normal cursor-pointer" onClick={handleYearModal}>{year}</span>
          </div>
          <div className='flex flex-row justify-center items-center'>
            <button
              type="button"
              className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              onClick={() => {
                if (month === 0) {
                  setYear(year - 1);
                  setMonth(11);
                } else {
                  setMonth(month - 1);
                }
              }}
            >
              <svg
                className="h-6 w-6 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              onClick={() => {
                if (month === 11) {
                  setYear(year + 1);
                  setMonth(0);
                } else {
                  setMonth(month + 1);
                }
              }}
            >
              <svg
                className="h-6 w-6 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
              onClick={handleDateRangerClose}
            >
              <MaterialSymbol icon='close' fill size={32} color='gray' />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap mb-3 -mx-1">
          {DAYS.map((day, index) => (
            <div key={index} className="px-1" style={{ width: '14.26%' }}>
              <span className="text-gray-800 font-medium text-center text-xs">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap -mx-1">
          {blankDays.map((_, index) => (
            <div key={index} className="text-center border p-1 border-transparent text-sm" style={{ width: '14.28%' }}></div>
          ))}
          {noOfDays.map((date, dateIndex) => (
            <div
              key={dateIndex}
              className="px-1 mb-1"
              style={{ width: '14.28%' }}
            >
              <div
                onClick={() => handleDateClick(date)}
                className={`cursor-pointer text-center text-sm l rounded-full leading-loose transition ease-in-out duration-100 ${isDateInRange(date) ? 'bg-blue-200' : isToday(date) ? 'bg-blue-500 text-white' : isBanned(date) ? 'bg-gray-400 text-white cursor-not-allowed' : isImportant(date) ? 'bg-green-300 text-gray-700' : 'text-gray-700 hover:bg-blue-200'}`}
              >
                {date}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className='text-center'>
            <span className="font-semibold text-center">Start Date: </span><br/> {start ? (formatDate(start)) :  <span className="text-xs"><br/>Start Date</span>}
          </div>
          <div className='text-center'>
            <span className="font-semibold text-center">End Date:</span><br/> {end ? (formatDate(end)) : <span className="text-xs  line"><br/>End Date</span>}
          </div>
        </div>
        <div className="mt-4 flex justify-center items-center gap-10 pt-2  border-t border-gray-200">
          <button
            className=" text-blue-500 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className=" text-red-500 rounded"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  };
  
  export default DateModal;