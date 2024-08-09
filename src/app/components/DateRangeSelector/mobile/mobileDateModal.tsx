import React from 'react';
import { DAYS, MONTH_NAMES } from '../../DatePicker/constants';
import { MaterialSymbol } from 'react-material-symbols';
import { format, isAfter, isBefore, isValid } from 'date-fns';

interface DateModalProps {
    month: number;
    year: number;
    blankDays: number[];
    noOfDays: number[];
    handleDateSelection: (date: number) => void;
    isToday: (date: number) => boolean;
    isBanned: (date: number) => boolean;
    isImportant: (date: number) => boolean;
    setStartDate: (startDate: string) => void;
    setEndDate: (endDate: string) => void;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    handleMonthModal: () => void;
    handleYearModal: () => void;
    startDate: string;
    endDate: string;
    onConfirm: () => void;
    onReset: () => void;
    handleDateRangerClose: () => void;
    setIsSelectingStartDate: (isSelectingStartDate: boolean) => void;
}


interface IDateArranger{
  endDate: string, 
  startDate: string, 
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void
  setIsSelectingStartDate: (isSelectingStartDate: boolean) => void
}


const MobileDateModal = ({
    month,
    year,
    blankDays,
    noOfDays,
    handleDateSelection,
    isToday,
    isBanned,
    isImportant,
    setStartDate,
    setEndDate,
    setMonth,
    setYear,
    handleMonthModal,
    handleYearModal,
    startDate,
    endDate,
    onConfirm,
    onReset,
    handleDateRangerClose,
    setIsSelectingStartDate,
}: DateModalProps) => {
    const handleDateClick = (date: number) => {
        handleDateSelection(date);
    };

    const isDateInRange = (date: number) => {
        if (startDate && endDate) {
            const [startDay, startMonth, startYear] = startDate.split('-').map(Number);
            const [endDay, endMonth, endYear] = endDate.split('-').map(Number);

            const parsedStartDate = new Date(startYear, startMonth - 1, startDay);
            const parsedEndDate = new Date(endYear, endMonth - 1, endDay);
            const currentDate = new Date(year, month, date);

            return currentDate >= parsedStartDate && currentDate <= parsedEndDate;
        }
        return false;
    };

    const DateArranger = ({endDate, startDate, setStartDate,setEndDate,setIsSelectingStartDate}: IDateArranger) => {
        if (endDate) {
            const [startDay, startMonth, startYear] = startDate.split('-').map(Number);
            const [endDay, endMonth, endYear] = endDate.split('-').map(Number);

            const parsedStartDate = new Date(startYear, startMonth - 1, startDay);
            const parsedEndDate = new Date(endYear, endMonth - 1, endDay);

            if (isBefore(parsedEndDate, parsedStartDate)) {
                setStartDate(endDate);
                setEndDate(startDate);
                setIsSelectingStartDate(false);
                
            }
        }
    };

    React.useEffect(() => {
        DateArranger({endDate, startDate, setStartDate,setEndDate,setIsSelectingStartDate});
    }, [endDate, startDate]);

console.log("Final Start Date",startDate,"FInal End Date",endDate)


    return (
<div className="fixed bottom-0 inset-0 flex items-center justify-center z-50 px-10">
      <div className="fixed inset-0 bg-gray-6 bg-opacity-80"></div>
      <div className="bg-white rounded-lg shadow p-4 relative z-1 w-[354px] h-[528px] min-h-[528px] min-w-[354px] max-h-[528px] max-w-[354px]">
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
                        className="inline-flex text-gray-500 hover:text-gray-700 transition ease-in-out duration-150 hover:bg-gray-200 p-1 rounded-full"
                        onClick={handleDateRangerClose}
                    >
                        <MaterialSymbol icon='close' fill size={32} color='gray' />
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-1">
                {DAYS.map((day, index) => (
                    <div key={index} className="px-1" style={{ width: '14.26%' }}>
                        <span className="text-gray-800 font-medium text-center text-xs">{day}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap -mx-1 min-h-[295px]">
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
                            className={`cursor-pointer text-center text-sm l rounded-full leading-loose transition ease-in-out duration-100 ${isDateInRange(date) && startDate ? 'bg-blue-200' : isToday(date) ? 'bg-blue-500 text-white' : isBanned(date) ? 'bg-gray-400 text-white cursor-not-allowed' : isImportant(date) ? 'bg-green-300 text-gray-700' : 'text-gray-700 hover:bg-blue-200'}`}
                        >
                            {date}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className='text-center'>
                    <span className="font-semibold text-center text-gray-500">Start Date: </span><br/> {startDate ? <span className='text-xs block'>{startDate}</span>  :  <span className="text-xs block"><br/>Start Date</span>}
                </div>
                <div className='text-center'>
                    <span className="font-semibold text-center text-gray-500">End Date:</span><br/>{endDate ?  <span className='text-xs block'>{endDate}</span>  : <span className="text-xs  block"><br/>End Date</span>}
                </div>
            </div>
            <div className="mt-4 flex justify-center items-center gap-10 pt-2  border-t border-gray-200">
                <button
                    className=" text-blue-500 rounded hover:scale-105 transition ease-in-out duration-100"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
                <button
                    className=" text-red-500 rounded hover:scale-105 transition ease-in-out duration-100"
                    onClick={onReset}
                >
                    Reset
                </button>
            </div>
        </div>
        </div>
    );
};

export default MobileDateModal;
