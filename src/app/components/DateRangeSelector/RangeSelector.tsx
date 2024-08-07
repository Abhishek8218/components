import React, { useState } from 'react';
import DateModal from './Desktop/DateModal';
// import { DAYS, MONTH_NAMES } from 's';

const DateRangePicker = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [isSelectingStartDate, setIsSelectingStartDate] = useState<boolean>(true);
  
    const blankDays = Array(new Date(year, month, 1).getDay()).fill(null);
    const noOfDays = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);
  
    const handleDateSelection = (date: number) => {
      const selectedDate = new Date(year, month, date).toLocaleDateString();
      if (isSelectingStartDate) {
        console.log("selected ",selectedDate);
        setStartDate(selectedDate);
        setIsSelectingStartDate(false);
      } else {
        console.log("End Date",selectedDate);
        setEndDate(selectedDate);
        setIsSelectingStartDate(true);
      }
    };
  
    const handleConfirm = () => {
      setShowDateModal(false);
    };

    const handleReset = () => {
      setStartDate(null);
      setEndDate(null);
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
  

    return (
      <div>
         <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Date
              </label>
        <input
          type="text"
          readOnly
          value={`${startDate || 'Start Date'} - ${endDate || 'End Date'}`}
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
            isToday={(date:number) => new Date().toDateString() === new Date(year, month, date).toDateString()}
            isBanned={(date) => false} // Define banned dates if needed
            isImportant={(date) => false} // Define important dates if needed
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