import React from 'react';
import { format, eachDayOfInterval, addWeeks } from 'date-fns';

interface WeekDateModalProps {
    weekStartDate: Date;
    handleDateSelection: (date: Date) => void;
    onDateClick: (date: Date) => void;

}

const WeekDateModal = ({
    weekStartDate,
    handleDateSelection,
    onDateClick,

}: WeekDateModalProps) => {
    const daysOfWeek = eachDayOfInterval({
        start: weekStartDate,
        end: addWeeks(weekStartDate, 1)
    });

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <button
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={() => onDateClick(addWeeks(weekStartDate, -1))}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <span className="text-lg font-bold text-gray-800">
                    {format(weekStartDate, 'MMMM yyyy')}
                </span>

                
                <button
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={() => onDateClick(addWeeks(weekStartDate, 1))}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map(day => (
                    <div
                        key={day.toString()}
                        onClick={() => handleDateSelection(day)}
                        className="cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 bg-gray-200 hover:bg-gray-300"
                    >
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
            {/* <button
                type="button"
                className="mt-4 p-2 text-red-500 hover:bg-red-100 rounded-full"
                onClick={handleDateRangerClose}
            >
                Close
            </button> */}
        </div>
    );
};

export default WeekDateModal;
