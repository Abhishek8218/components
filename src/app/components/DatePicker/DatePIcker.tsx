import React, { useState, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import DateModal from './PCs/DateModal';
import MonthModal from './PCs/MonthModal';
import YearModal from './PCs/YearModal';
import { DAYS, MONTH_NAMES } from './constants';
import MobileDateModal from './Android/DateModal';
import MobileMonthModal from './Android/MonthModal';
import MobileYearModal from './Android/YearModal';

const DatePicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);

  const isToday = (date: number) => new Date().toDateString() === new Date(year, month, date).toDateString();
  const isBanned = (date: number) => date % 5 === 0;
  const isImportant = (date: number) => date % 7 === 0;

  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  }, [month, year]);




  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };




  const getDateValue = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
    setShowDatepicker(false);
  };

  const handleMonthModal = () => {
    setShowMonthModal(true);
    setShowDatepicker(false);
  };


  const handleMonthModalClose = () => {
    setShowMonthModal(false);
    setShowDatepicker(true);
  };
  const handleYearModal = () => {
    setShowYearModal(true);
    setShowDatepicker(false);
  };

  const handleMonthSelect = (selectedMonth: number) => {
    setMonth(selectedMonth);
    setShowMonthModal(false);
  };

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setShowYearModal(false);
  };

  const handleYearModalClose = () => {
    setShowDatepicker(true);
    setShowYearModal(false);
  }



  const closeModals = () => {
    setShowDatepicker(false);
    setShowYearModal(false);
    setShowMonthModal(false);
  };

// Function to check if the device is mobile
  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState('');
  
    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);
  
    return userAgent;
  };

  const userAgent = useUserAgent();

  const isMobile = /Mobi|Android/i.test(userAgent);






  return (
    // <div className="w-[20rem] mx-auto">
    //   <div className="relative">
    //     <input
    //       type="text"
    //       readOnly
    //       className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"

    //       placeholder="Select date"
    //       value={date}
    //       onClick={() => setShowDatepicker(!showDatepicker)}
    //     />
    //     <MaterialSymbol
    //       icon="calendar_today"
    //       fill
    //       size={32}
    //       color="gray"
    //       className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
    //       onClick={() => setShowDatepicker(!showDatepicker)}
    //     />
    //     {showDatepicker && (
    //      isMobile ? <MobileDateModal month={month}
    //      year={year}
    //      blankDays={blankDays}
    //      noOfDays={noOfDays}
    //      getDateValue={getDateValue}
    //      isToday={isToday}
    //      isBanned={isBanned}
    //      isImportant={isImportant}
    //      setMonth={setMonth}
    //      setYear={setYear}
    //      handleMonthModal={handleMonthModal}
    //      handleYearModal={handleYearModal} /> : <DateModal
    //         month={month}
    //         year={year}
    //         blankDays={blankDays}
    //         noOfDays={noOfDays}
    //         getDateValue={getDateValue}
    //         isToday={isToday}
    //         isBanned={isBanned}
    //         isImportant={isImportant}
    //         setMonth={setMonth}
    //         setYear={setYear}
    //         handleMonthModal={handleMonthModal}
    //         handleYearModal={handleYearModal}
    //       />
    //     )}
    //     {showMonthModal && (
    //       <MonthModal
    //         month={month}
    //         showMonthModal={showMonthModal}
    //         handleMonthSelect={handleMonthSelect}
    //         handleMonthModalClose={handleMonthModal}
    //       />
    //     )}
    //     {showYearModal && (
    //       <YearModal
    //         year={year}
    //         showYearModal={showYearModal}
    //         handleYearSelect={handleYearSelect}
    //         handleYearModalClose={handleYearModalClose}
    //       />
    //     )}
    //   </div>
    // </div>
    <div className="relative">
      { (showDatepicker || showYearModal || showMonthModal) && (
        <div
          className="fixed inset-0 bg-gray-800 min-h-full bg-opacity-50 z-40"
          onClick={closeModals}
        />
      )}
      <div className="flex items-center justify-center relative z-50 ">
        <div className="antialiased sans-serif">
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
              <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="hidden"
                  name="date"
                />
                <input
                  type="text"
                  readOnly
                  value={date}
                  onClick={() => setShowDatepicker(!showDatepicker)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setShowDatepicker(false); }}
                  className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Select date"
                />
                <div className="absolute top-0 right-0 px-3 py-2" onClick={() => setShowDatepicker(!showDatepicker)}>
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                {showDatepicker && (
         isMobile ? <MobileDateModal month={month}
         year={year}
         blankDays={blankDays}
         noOfDays={noOfDays}
         getDateValue={getDateValue}
         isToday={isToday}
         isBanned={isBanned}
         isImportant={isImportant}
         setMonth={setMonth}
         setYear={setYear}
         handleMonthModal={handleMonthModal}        
         handleYearModal={handleYearModal}
         handleDatePickerClose= {() => setShowDatepicker(false)} /> : <DateModal
            month={month}
            year={year}
            blankDays={blankDays}
            noOfDays={noOfDays}
            getDateValue={getDateValue}
            isToday={isToday}
            isBanned={isBanned}
            isImportant={isImportant}
            setMonth={setMonth}
            setYear={setYear}
            handleMonthModal={handleMonthModal}
            handleYearModal={handleYearModal}
          />
        )}
        {showMonthModal && (
          isMobile ? <MobileMonthModal   month={month}
          showMonthModal={showMonthModal}
          handleMonthSelect={handleMonthSelect}
          handleMonthModalClose={handleMonthModalClose}/> : 
          <MonthModal
            month={month}
            showMonthModal={showMonthModal}
            handleMonthSelect={handleMonthSelect}
            handleMonthModalClose={handleMonthModalClose}
          />
        )}
        {showYearModal && (
          isMobile ? <MobileYearModal   year={year}
          showYearModal={showYearModal}
          handleYearSelect={handleYearSelect}
          handleYearModalClose={handleYearModalClose}/> :
          <YearModal
            year={year}
            showYearModal={showYearModal}
            handleYearSelect={handleYearSelect}
            handleYearModalClose={handleYearModalClose}
          />
        )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
