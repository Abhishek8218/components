import React, { useState, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import DateModal from './PCs/DateModal';
import MonthModal from './PCs/MonthModal';
import YearModal from './PCs/YearModal';
import { DAYS, MONTH_NAMES } from './constants';
import MobileDateModal from './Android/DateModal';
import MobileMonthModal from './Android/MonthModal';
import MobileYearModal from './Android/YearModal';




interface DatesByMonth {
  [key: number]: number[];
}
const DatePicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const isToday = (date: number) => new Date().toDateString() === new Date(year, month, date).toDateString();
  


  // Banned and important dates mapped by month (0-based index for months)
const bannedDatesByMonth:DatesByMonth = {
  0: [2, 5, 7, 8], // January
  7: [2, 4, 5, 7], // February
  // Add more months here
};

const importantDatesByMonth:DatesByMonth = {
  0: [1, 10, 15], // January
  7: [3, 12, 18], // February
  // Add more months here
};
 


const isBanned = (date: number) => {
  const bannedDates = bannedDatesByMonth[month] || [];
  return bannedDates.includes(date);
};

const isImportant = (date: number) => {
  const importantDates = importantDatesByMonth[month] || [];
  return importantDates.includes(date);
};



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

  

  const handleDateClick = (date: number) => {
    if (!isBanned(date)) {
      console.log("selected ", date);
      setSelectedDate(date);
      getDateValue(date);
    }
  };
console.log("selected date is  ",selectedDate);


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




  // Function to set the current date
  const setCurrentDay = () => {
    const today = new Date();
    setDate(formatDate(today));
    setSelectedDate(today.getDate());
   
  };

  // Function to set the current month
  const setCurrentMonth = () => {
    setMonth(new Date().getMonth());
  };

  // Function to set the current year
  const setCurrentYear = () => {
    setYear(new Date().getFullYear());
  };






  useEffect(() => {


      
    if ( isMobile && (showDatepicker || showYearModal || showMonthModal)) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  
  }, [showDatepicker, showYearModal, showMonthModal]);


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
         handleDatePickerClose= {() => setShowDatepicker(false)}
          setCurrentDay={setCurrentDay} 
          handleDateClick={handleDateClick}
          SelectedDate={selectedDate} />
         :
           <DateModal
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
          handleMonthModalClose={handleMonthModalClose}
          setCurrentMonth={setCurrentMonth}
          /> : 
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
          handleYearModalClose={handleYearModalClose} 
          setCurrentYear={setCurrentYear}/> :
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
