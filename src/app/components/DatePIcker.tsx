import React, { useState, useEffect, useRef } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const bannedDates = ['2024-08-10', '2024-08-15']; // Example banned dates
const importantDates = ['2024-08-05', '2024-08-25']; // Example important dates

const DatePicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false); // State for month modal
  const [datepickerValue, setDatepickerValue] = useState('');
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const dateInputRef = useRef<HTMLInputElement>(null);
  const yearModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  useEffect(() => {
    if (showYearModal && yearModalRef.current) {
      const yearElement = yearModalRef.current.querySelector(`p[data-year='${year}']`);
      if (yearElement) {
        yearElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [showYearModal, year]);

  const initDate = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setDatepickerValue(today.toDateString());
  };

  const isToday = (date: number) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const isBanned = (date: number) => {
    const d = new Date(year, month, date);
    const formattedDate = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
    return bannedDates.includes(formattedDate);
  };

  const isImportant = (date: number) => {
    const d = new Date(year, month, date);
    const formattedDate = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
    return importantDates.includes(formattedDate);
  };

  const getDateValue = (date: number) => {
    if (isBanned(date)) return; // Prevent selecting banned dates
    const selectedDate = new Date(year, month, date);
    const day = ('0' + selectedDate.getDate()).slice(-2);
    const monthFormatted = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // Month is zero-based
    const yearFormatted = selectedDate.getFullYear();
    const formattedDate = `${day}-${monthFormatted}-${yearFormatted}`;
console.log("day: ",day)
console.log("month: ",monthFormatted)
console.log("year: ",yearFormatted)
    console.log("formattedDate",formattedDate);
    
    setDatepickerValue(formattedDate);
    if (dateInputRef.current) {
      dateInputRef.current.value = formattedDate;
    }
    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();

    const blankDaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setShowYearModal(false);
    setShowDatepicker(true); // Ensure datepicker is shown after selecting year
  };

  const handleMonthSelect = (selectedMonth: number) => {
    setMonth(selectedMonth);
    setShowMonthModal(false);
    setShowDatepicker(true); // Ensure datepicker is shown after selecting month
  };

  const handleYearModal = () => {
    setShowYearModal(true);
    setShowDatepicker(false);
  };

  const handleYearModalClose = () => {
    setShowYearModal(false);
    setShowDatepicker(true);
  };

  const handleMonthModal = () => {
    setShowMonthModal(true);
    setShowDatepicker(false);
  };

  const handleMonthModalClose = () => {
    setShowMonthModal(false);
    setShowDatepicker(true);
  };

  const closeModals = () => {
    setShowDatepicker(false);
    setShowYearModal(false);
    setShowMonthModal(false);
  };

  console.log(datepickerValue);


  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, [])


  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState('');
  
    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);
  
    return userAgent;
  };





const DateModal = () => (
  <div className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0" style={{ width: '17rem' }}>
  <div className="flex justify-between items-center mb-2">
    <div>
      <span className="text-lg font-bold text-gray-800 cursor-pointer" onClick={handleMonthModal}>{MONTH_NAMES[month]}</span>
      <span className="ml-1 text-lg text-gray-600 font-normal cursor-pointer" onClick={handleYearModal}>{year}</span>
    </div>
    <div>
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
    </div>
  </div>
  <div className="flex flex-wrap mb-3 -mx-1">
    {DAYS.map((day, index) => (
      <div key={index} className="px-1" style={{ width: '14.26%' }}>
        <span className="text-gray-800 font-medium text-center text-xs">{day}</span>
      </div>
    ))}
  </div>
  <div className="flex flex-wrap -mx-1">
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
          onClick={() => getDateValue(date)}
          className={`cursor-pointer text-center text-sm l rounded-full leading-loose transition ease-in-out duration-100 ${isToday(date) ? 'bg-blue-500 text-white' : isBanned(date) ? 'bg-gray-400 text-white cursor-not-allowed' : isImportant(date) ? 'bg-green-300 text-gray-700' : 'text-gray-700 hover:bg-blue-200'}`}
        >
          {date}
        </div>
      </div>
    ))}
  </div>
</div>
)





  // Month Modal Component
  const MonthModal = () => (
    <div className={` inset-0 flex items-center justify-center max-w-[272px] max-h-[270px] z-40 ml-4 mt-2 ${showMonthModal ? '' : 'hidden'}`}>
      <div className="absolute inset-0  bg-opacity-50" onClick={handleMonthModalClose}></div>
      <div className="bg-white rounded-lg min-w-[272px] h-[270px] p-4 relative">
        <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
          <h3 className="text-lg font-bold text-gray-800">Select Month</h3>
          <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleMonthModalClose} />
        </div>
        <div className="grid grid-cols-1 gap-2 overflow-y-scroll max-h-[200px] ">
          {MONTH_NAMES.map((monthName, index) => (
            <p
              key={index}
              onClick={() => handleMonthSelect(index)}
              className={`cursor-pointer px-2 py-1 rounded-lg transition text-sm text-center ${index === month ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {monthName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );



  //Year Modal
const YearModal = () => (
  <div className="inset-0 flex items-center justify-center mt-[2px] w-[272px] h-[270px] no-scrollbar">
  <div ref={yearModalRef} className="bg-gray-100 rounded-lg w-[272px] h-[270px] p-4  no-scrollbar">
    <div className='w-full flex flex-row flex-nowrap justify-between mb-4'>
      <h3 className="text-lg font-semibold">Select Year</h3>
      <MaterialSymbol icon='close' fill size={32} color='gray' onClick={handleYearModalClose} />
    </div>
    <div className="grid grid-cols-3 overflow-y-scroll max-h-[150px]">
      {Array.from({ length: 61 }, (_, i) => new Date().getFullYear() - 60 + i).map(yearOption => (
        <p
          key={yearOption}
          data-year={yearOption}
          onClick={() => handleYearSelect(yearOption)}
          className={`m-1 px-2 py-1 rounded-lg transition text-sm duration-200 text-center ${yearOption === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          {yearOption}
        </p>
      ))}
    </div>
  </div>
</div>


);



  return (
    <div className="relative">
      { (showDatepicker || showYearModal || showMonthModal) && (
        <div
          className="fixed inset-0 bg-gray-800 min-h-full bg-opacity-50 z-40"
          onClick={closeModals}
        />
      )}
      <div className="flex items-center justify-center relative z-50">
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
                  value={datepickerValue}
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
                 <DateModal/>
                )}
                {showYearModal && (
                 <YearModal/>
                )}
                <MonthModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
