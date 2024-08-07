import React, { useState } from 'react';
import DateModal from './Desktop/DateModal';
// import { DAYS, MONTH_NAMES } from 's';

import { format, parse, isValid } from 'date-fns';

const DateRangePicker = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [startDate, setStartDate] = useState<string | null>("");
    const [endDate, setEndDate] = useState<string | null>("");
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [isSelectingStartDate, setIsSelectingStartDate] = useState<boolean>(true);
  
    const blankDays = Array(new Date(year, month, 1).getDay()).fill(null);
    const noOfDays = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);
  
    const handleDateSelection = (date: number) => {
        const selectedDate = new Date(year, month, date);
        const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      
        if (isSelectingStartDate) {
            console.log("selected ", formattedDate);
            setStartDate(formattedDate);
            setIsSelectingStartDate(false);
        } else {
            console.log("End Date", formattedDate);
            setEndDate(formattedDate);
            setIsSelectingStartDate(true);
        }
    };
  
    const handleConfirm = () => {
        setShowDateModal(false);
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setIsSelectingStartDate(true);
    };
  
    const handleInputClick = () => {
        setShowDateModal(true);
    };
  
    const handleMonthModal = () => {
        // Handle month modal logic if needed
    };
  
    const handleYearModal = () => {
        // Handle year modal logic if needed
    };

    // const formatDisplayDate = (date: string | null) => {
    //     if (!date) return 'Date';
    //     const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    //     return isValid(parsedDate) ? format(parsedDate, 'dd-MM-yyyy') : 'Invalid Date';
    // };
  
    return (
        <div>
            <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Date
            </label>
            <input
                type="text"
                readOnly
                value={`${startDate}-${endDate} `}
                // value={`${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`}
                onClick={handleInputClick}
                className="cursor-pointer border p-2 rounded"
            />
            {showDateModal && (
                <DateModal
                    month={month}
                    year={year}
                    blankDays={blankDays}
                    noOfDays={noOfDays}
                    handleDateSelection={handleDateSelection}
                    isToday={(date: number) => new Date().toDateString() === new Date(year, month, date).toDateString()}
                    isBanned={(date: number) => false} // Define banned dates if needed
                    isImportant={(date: number) => false} // Define important dates if needed
                    setMonth={setMonth}
                    setYear={setYear}
                    handleMonthModal={handleMonthModal}
                    handleYearModal={handleYearModal}
                    startDate={startDate || ''}
                    endDate={endDate || ''}
                    onConfirm={handleConfirm}
                    onReset={handleReset}
                    handleDateRangerClose={() => setShowDateModal(false)}
                />
            )}
        </div>
    );
};
  
export default DateRangePicker;