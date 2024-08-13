'use client';


import React, { useState, useEffect } from 'react';
import { DAYS, MONTH_NAMES } from './constants';
import { MaterialSymbol } from 'react-material-symbols';



interface AttendanceCalModalProps {
  month: number;
  year: number;
  selectedate: string;
  blankDays: number[];
  noOfDays: number[];
  getDateValue: (date: number) => void;
  isToday: (date: number) => boolean;
  isBanned: (date: number) => boolean;
  isImportant: (date: number) => boolean;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  handleMonthModal: () => void;
  handleYearModal: () => void;
  onConfirm: () => void;
  onReset: () => void;
  handleDateClick: (date: number) => void;
  SelectedDate: number;

  activeDate: string;
  handleDatePickerClose: () => void;
  setcurrentDay: () => void;
}

const AttendanceCalModal= ({
  month,
  year,
  selectedate,
  blankDays,
  noOfDays,
  getDateValue,
  isToday,
  isBanned,
  isImportant,
  setMonth,
  setYear,
  handleMonthModal,
  handleYearModal,
  onConfirm,
  onReset,
  handleDateClick,
  SelectedDate,
handleDatePickerClose,
  activeDate,
  setcurrentDay
}:AttendanceCalModalProps) => {
  useEffect(() => {
    // Disable scrolling on the background
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'auto';
    };
  }, []);



  return (
    console.log("DateModal", selectedate),
    console.log("activeDate", activeDate),
    <div className="fixed bottom-0 inset-0 flex items-center justify-center z-50 ">
      <div className="fixed inset-0 bg-gray-6 bg-opacity-80"></div>
      <div className="bg-white rounded-lg shadow p-4 relative z-1 w-[354px] h-[528px] min-h-full min-w-full ">
        <div className="flex justify-between items-center">
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
            <div className='flex justify-center border-t border-gray-100 w-full'>
          <button className='text-blue-500' onClick={setcurrentDay}>Today</button>

        </div>
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
              onClick={handleDatePickerClose}
            >
              <MaterialSymbol icon='close' fill size={32} color='gray' />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap mb-8 -mx-1">
          {DAYS.map((day, index) => (
            <div key={index} className="px-1" style={{ width: '14.26%' }}>
              <span className="text-gray-800 font-medium text-center text-sm">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap -mx-1 gap-y-9 min-h-[375px]">
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
              className={`cursor-pointer text-center text-sm l rounded-full leading-loose transition ease-in-out duration-100 ${
                selectedate === activeDate && SelectedDate === date
                  ? "bg-blue-500 text-white"
                  : isToday(date)
                  ? "bg-blue-300 text-white"
                  : isBanned(date)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : isImportant(date)
                  ? "bg-green-300 text-gray-700"
                  : "text-gray-700 hover:bg-blue-200"
              }`}
            >
              {date}
            </div>
            </div>
          ))}
        </div>
        {/* <div className='flex justify-center border-t border-gray-100 w-full'>
          <button className='text-blue-500' onClick={setcurrentDay}>Today</button>

        </div> */}
        <div className="flex justify-between w-full pt-2 px-2  border-t border-gray-200">
        <button
          className={`  rounded hover:scale-105 transition ease-in-out duration-100 ${
            selectedate
              ? " text-blue-500 cursor-pointer"
              : "cursor-not-allowed disabled text-gray-300"
          }`}
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          className={`  rounded hover:scale-105 transition ease-in-out duration-100 ${
            selectedate
              ? " text-red-500 cursor-pointer"
              : "cursor-not-allowed disabled text-gray-300"
          }`}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
      </div>
    </div>
  );
};

export default AttendanceCalModal;
