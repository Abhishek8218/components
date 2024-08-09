import React, { useEffect, useState } from 'react';
import DateModal from './Desktop/DateModal';
// import { DAYS, MONTH_NAMES } from 's';

import { format, parse, isValid } from 'date-fns';
import MobileDateModal from './mobile/mobileDateModal';

const DateRangePicker = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [startDate, setStartDate] = useState<string | null>("");
    const [endDate, setEndDate] = useState<string | null>("");
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [isSelectingStartDate, setIsSelectingStartDate] = useState<boolean>(true);
  
    const blankDays = Array(new Date(year, month, 1).getDay()).fill(null);
    const noOfDays = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);


    const useUserAgent = () => {
        const [userAgent, setUserAgent] = useState('');
      
        useEffect(() => {
          setUserAgent(navigator.userAgent);
        }, []);
      
        return userAgent;
      };
    
      const userAgent = useUserAgent();
    
      const isMobile = /Mobi|Android|iPad|iPhone|iPod/i.test(userAgent);







    const handleDateSelection = (date: number) => {
        const selectedDate = new Date(year, month, date);
        if (isNaN(selectedDate.getTime())) {
            console.error("Invalid date at handleDateSelection:", selectedDate);
            return; 
        }
    
        const formattedDate = format(selectedDate, 'dd-MM-yyyy');
        console.log("Formatted Date:", formattedDate);
        if (isSelectingStartDate) {
            console.log("Selected Start Date:", formattedDate);
            setStartDate(formattedDate);
            setIsSelectingStartDate(false);
        } else {
            console.log("Selected End Date:", formattedDate);
            setEndDate(formattedDate);
            setIsSelectingStartDate(true);
        }
    };
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        const parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date());
        if (!isValid(parsedDate)) return 'Invalid Date';
        return format(parsedDate, 'dd-MM-yyyy');
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
                value={`  ${startDate ? startDate: "Start Date"
                }${endDate ? " to " : " - "}  ${endDate ? endDate : "End Date "} `}
             
                onClick={handleInputClick}
                className="cursor-pointer border p-2 rounded text-gray-500 w-64 text-center"
            />
            {showDateModal && (
                isMobile ? <MobileDateModal   month={month}
                year={year}
                blankDays={blankDays}
                noOfDays={noOfDays}
                handleDateSelection={handleDateSelection}
                isToday={(date: number) => new Date().toDateString() === new Date(year, month, date).toDateString()}
                isBanned={(date: number) => false} // Define banned dates if needed
                isImportant={(date: number) => false} // Define important dates if needed
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setMonth={setMonth}
                setYear={setYear}
                handleMonthModal={handleMonthModal}
                handleYearModal={handleYearModal}
                startDate={startDate || ''}
                endDate={endDate || ''}
                onConfirm={handleConfirm}
                onReset={handleReset}
                handleDateRangerClose={() => setShowDateModal(false)}
                setIsSelectingStartDate={setIsSelectingStartDate}/> :

                <DateModal
                    month={month}
                    year={year}
                    blankDays={blankDays}
                    noOfDays={noOfDays}
                    handleDateSelection={handleDateSelection}
                    isToday={(date: number) => new Date().toDateString() === new Date(year, month, date).toDateString()}
                    isBanned={(date: number) => false} // Define banned dates if needed
                    isImportant={(date: number) => false} // Define important dates if needed
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setMonth={setMonth}
                    setYear={setYear}
                    handleMonthModal={handleMonthModal}
                    handleYearModal={handleYearModal}
                    startDate={startDate || ''}
                    endDate={endDate || ''}
                    onConfirm={handleConfirm}
                    onReset={handleReset}
                    handleDateRangerClose={() => setShowDateModal(false)}
                    setIsSelectingStartDate={setIsSelectingStartDate}
                />
            )}
        </div>
    );
};
  
export default DateRangePicker;