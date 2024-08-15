'use client';

import React, { useState, useEffect } from "react";
import AttendanceCalModal from "./attendanceModal";

interface DatesByMonth {
  [key: number]: number[];
}
const DatePicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate()
  );
  const [activeDate, setActiveDate] = useState<string>("");



  // Banned and important dates mapped by month (0-based index for months)
  const HolidaysByMonth: DatesByMonth = {
    
  };

  const attendanceByMonth: DatesByMonth = {
    0: [1, 10, 15], 
    7: [2,3,4,5,6,7,8,9,10, 12,13,14,15, 18], 
   
  };


   // Utility functions to check if a date is today, banned, or important
  const isToday = (date: number) => new Date().toDateString() === new Date(year, month, date).toDateString();
  const isHoliday = (date: number) => HolidaysByMonth[month]?.includes(date) || false;
  const isAttendance = (date: number) => attendanceByMonth[month]?.includes(date) || false;




    // Update the number of days and blank days whenever the month or year changes
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
    setNoOfDays(daysArray);
  }, [month, year]);



  // Format a date into a "dd-mm-yyyy" string
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



  // Handle clicking on a date in the date picker
  const handleDateClick = (date: number) => {
    handleActiveDate(date);
    if (!isHoliday(date)) {
      console.log("selected ", date);
      setSelectedDate(date);
      getDateValue(date);
    }
  };
  console.log("selected date is  ", selectedDate);



  // Get the formatted date value when a date is selected
  const getDateValue = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };



  // Function to set the Active date when a date is clicked
  const handleActiveDate = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const formattedDate = formatDate(selectedDate);
    setActiveDate(formattedDate);
  };

  // Set the active date when the date, month, or year changes
  useEffect(() => {
    handleActiveDate(selectedDate);
  }, [date, month, year]);

//Functions to modals

  

 


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
    setShowMonthModal(false);
    setShowDatepicker(true);
  };

  // Function to set the current year
  const setCurrentYear = () => {
    setYear(new Date().getFullYear());
    setShowYearModal(false);
    setShowDatepicker(true);
  };

  // Function to reset the date
  const resetDate = () => {
    setDate("");
  };

  

  // Function to check if the device is mobile
  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();

  const isMobile = /Mobi|Android/i.test(userAgent);

  return (
    <div className="relative">
      {(showDatepicker || showYearModal || showMonthModal) && (
        <div
          className="fixed inset-0 min-h-full bg-opacity-50 z-40"
          onClick={closeModals}
        />
      )}
      <div className="flex items-center justify-center relative z-50 ">
        <div className="antialiased sans-serif">
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
        
              <div className="relative">
               
                
                    <AttendanceCalModal
                            month={month}
                      year={year}
                
                      noOfDays={noOfDays}
                     
                      isToday={isToday}
                      isHoliday={isHoliday}
                      isAttendance={isAttendance}
                      setMonth={setMonth}
                      setYear={setYear}
                     
                      
                   
                      selectedate={date}
                      handleDateClick={handleDateClick}
                      SelectedDate={selectedDate}
                     
                      setcurrentDay={setCurrentDay}
                      activeDate={activeDate}
                    />
        
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
