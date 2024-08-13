import React from "react";
import { DAYS, MONTH_NAMES } from "../constants";
import { on } from "events";

interface DateModalProps {
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
  setcurrentDay: () => void;
}

const DateModal = ({
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
  setcurrentDay,

  activeDate,
}: DateModalProps) => (
  console.log("DateModal", selectedate),
  console.log("activeDate", activeDate),
  (
    // console.log('SelectedDate', SelectedDate),
    <div
      className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
      style={{ width: "17rem" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <span
            className="text-lg font-bold text-gray-800 cursor-pointer"
            onClick={handleMonthModal}
          >
            {MONTH_NAMES[month]}
          </span>
          <span
            className="ml-1 text-lg text-gray-600 font-normal cursor-pointer"
            onClick={handleYearModal}
          >
            {year}
          </span>
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
        </div>
      </div>
      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map((day, index) => (
          <div key={index} className="px-1" style={{ width: "14.26%" }}>
            <span className="text-gray-800 font-medium text-center text-xs">
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap -mx-1 min-h-48">
        {blankDays.map((_, index) => (
          <div
            key={index}
            className="text-center border p-1 border-transparent text-sm"
            style={{ width: "14.28%" }}
          ></div>
        ))}
        {noOfDays.map((date, dateIndex) => (
          <div
            key={dateIndex}
            className="px-1 mb-1"
            style={{ width: "14.28%" }}
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
  )
);

export default DateModal;
