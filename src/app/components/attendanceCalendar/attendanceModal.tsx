"use client";

import React, { useEffect } from "react";
import { DAYS, MONTH_NAMES } from "./constants";
import { MaterialSymbol } from "react-material-symbols";

interface AttendanceCalModalProps {
  month: number;
  year: number;

  selectedate: string;
  noOfDays: number[];

  isToday: (date: number) => boolean;
  isHoliday: (date: number) => boolean;
  isAttendance: (date: number) => boolean;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;

  handleDateClick: (date: number) => void;
  SelectedDate: number;
  activeDate: string;
  setcurrentDay: () => void;
  handleMonthChange: (direction: 'previous' | 'next') => void;
}

const AttendanceCalModal = ({
  month,
  year,

  selectedate,
  noOfDays,
  isToday,
  isHoliday,
  isAttendance,
  handleDateClick,
  SelectedDate,
  activeDate,
  handleMonthChange
}: AttendanceCalModalProps) => {
  useEffect(() => {
    // Disable scrolling on the background
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  // Function to get day name
  const getDayName = (date: number) => {
    const day = new Date(year, month, date).getDay();
    return DAYS[day];
  };

  return (
    <div className="fixed bottom-0 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-80"></div>
      <div className="bg-white rounded-lg shadow relative z-1 w-[354px] h-[528px] min-h-full min-w-full">
        <div className="grid grid-cols-5 -mx-1 min-h-[375px] ">
          {noOfDays.map((date, index) => {
            const dayName = getDayName(date);
            const isSunday = dayName === "Sun";

            return (
              <div
                key={index}
                className={`cursor-pointer px-1 font-bold border-b-2 border-r-2 border-gray-400 flex justify-center h-20 hover:bg-blue-500 ${
                  selectedate === activeDate && SelectedDate === date
                    ? "bg-blue-500 text-white"
                    : isToday(date)
                    ? "bg-blue-300 text-white"
                    : isSunday || isHoliday(date)
                    ? "bg-yellow-300 text-gray-700"
                    : isAttendance(date)
                    ? "bg-green-300 text-gray-700"
                    : "text-gray-700 hover:bg-blue-200"
                }`}
              >
                <div className="items-center justify-center">
                  <span className="text-gray-500 text-xs">{dayName}</span>
                  <div onClick={() => handleDateClick(date)}>{date}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 flex justify-between items-center w-full border-gray-200">
          <button
            className="rounded w-24 p-3 bg-gray-300 hover:scale-105 transition ease-in-out duration-100"
            onClick={() => handleMonthChange('previous')}
          >
            Previous
          </button>
          <div>
            <span className="text-lg font-bold text-gray-800 cursor-pointer">
              {MONTH_NAMES[month]}
            </span>
            <span className="ml-1 text-lg text-gray-600 font-normal cursor-pointer">
              {year}
            </span>
          </div>
          <button
            className="rounded w-24 hover:scale-105 transition ease-in-out duration-100 bg-gray-300 p-3"
            onClick={() => handleMonthChange('next')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalModal;
