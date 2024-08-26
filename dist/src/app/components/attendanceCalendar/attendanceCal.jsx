'use client';
import React, { useState, useEffect } from "react";
import AttendanceCalModal from "./attendanceModal";
var DatePicker = function (_a) {
    var selectedMonth = _a.selectedMonth, selectedYear = _a.selectedYear;
    var _b = useState(false), showDatepicker = _b[0], setShowDatepicker = _b[1];
    var _c = useState(false), showMonthModal = _c[0], setShowMonthModal = _c[1];
    var _d = useState(false), showYearModal = _d[0], setShowYearModal = _d[1];
    var _e = useState(""), date = _e[0], setDate = _e[1];
    var _f = useState(new Date().getMonth()), month = _f[0], setMonth = _f[1];
    var _g = useState(new Date().getFullYear()), year = _g[0], setYear = _g[1];
    var _h = useState([]), noOfDays = _h[0], setNoOfDays = _h[1];
    var _j = useState(new Date().getDate()), selectedDate = _j[0], setSelectedDate = _j[1];
    var _k = useState(""), activeDate = _k[0], setActiveDate = _k[1];
    // Banned and important dates mapped by month (0-based index for months)
    var HolidaysByMonth = {};
    var attendanceByMonth = {
        0: [1, 10, 15],
        7: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 18],
    };
    // Utility functions to check if a date is today, banned, or important
    var isToday = function (date) { return new Date().toDateString() === new Date(year, month, date).toDateString(); };
    var isHoliday = function (date) { var _a; return ((_a = HolidaysByMonth[month]) === null || _a === void 0 ? void 0 : _a.includes(date)) || false; };
    var isAttendance = function (date) { var _a; return ((_a = attendanceByMonth[month]) === null || _a === void 0 ? void 0 : _a.includes(date)) || false; };
    // Set the Custom month and year
    useEffect(function () {
        // Use selectedMonth and selectedYear if provided, otherwise use current month/year
        var monthToSet = selectedMonth !== undefined && selectedMonth >= 1 && selectedMonth <= 12
            ? selectedMonth - 1 // Subtract 1 since JavaScript Date months are 0-based
            : new Date().getMonth();
        var yearToSet = selectedYear || new Date().getFullYear();
        setMonth(monthToSet);
        setYear(yearToSet);
    }, [selectedMonth, selectedYear]);
    // Update the number of days and blank days whenever the month or year changes
    useEffect(function () {
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var dayOfWeek = new Date(year, month).getDay();
        var blankdaysArray = [];
        for (var i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }
        var daysArray = [];
        for (var i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        setNoOfDays(daysArray);
    }, [month, year]);
    // Format a date into a "dd-mm-yyyy" string
    var formatDate = function (date) {
        var day = String(date.getDate()).padStart(2, "0");
        var month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        var year = date.getFullYear();
        return "".concat(day, "-").concat(month, "-").concat(year);
    };
    // Handle clicking on a date in the date picker
    var handleDateClick = function (date) {
        handleActiveDate(date);
        if (!isHoliday(date)) {
            console.log("selected ", date);
            setSelectedDate(date);
            getDateValue(date);
        }
    };
    console.log("selected date is  ", selectedDate);
    // Get the formatted date value when a date is selected
    var getDateValue = function (day) {
        var selectedDate = new Date(year, month, day);
        var formattedDate = formatDate(selectedDate);
        setDate(formattedDate);
    };
    // Function to set the Active date when a date is clicked
    var handleActiveDate = function (day) {
        var selectedDate = new Date(year, month, day);
        var formattedDate = formatDate(selectedDate);
        setActiveDate(formattedDate);
    };
    // Set the active date when the date, month, or year changes
    useEffect(function () {
        handleActiveDate(selectedDate);
    }, [date, month, year]);
    //Functions to modals
    var closeModals = function () {
        setShowDatepicker(false);
        setShowYearModal(false);
        setShowMonthModal(false);
    };
    // Function to set the current date
    var setCurrentDay = function () {
        var today = new Date();
        setDate(formatDate(today));
        setSelectedDate(today.getDate());
    };
    // Function to set the current month
    var setCurrentMonth = function () {
        setMonth(new Date().getMonth());
        setShowMonthModal(false);
        setShowDatepicker(true);
    };
    // Function to set the current year
    var setCurrentYear = function () {
        setYear(new Date().getFullYear());
        setShowYearModal(false);
        setShowDatepicker(true);
    };
    // Function to handle month change
    var handleMonthChange = function (direction) {
        if (direction === 'previous') {
            if (month === 0) {
                setYear(year - 1);
                setMonth(11);
            }
            else {
                setMonth(month - 1);
            }
        }
        else {
            if (month === 11) {
                setYear(year + 1);
                setMonth(0);
            }
            else {
                setMonth(month + 1);
            }
        }
    };
    // Function to check if the device is mobile
    var useUserAgent = function () {
        var _a = useState(""), userAgent = _a[0], setUserAgent = _a[1];
        useEffect(function () {
            setUserAgent(navigator.userAgent);
        }, []);
        return userAgent;
    };
    var userAgent = useUserAgent();
    var isMobile = /Mobi|Android/i.test(userAgent);
    return (<div className="relative">
      {(showDatepicker || showYearModal || showMonthModal) && (<div className="fixed inset-0 min-h-full bg-opacity-50 z-40" onClick={closeModals}/>)}
      <div className="flex items-center justify-center relative z-50 ">
        <div className="antialiased sans-serif">
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
        
              <div className="relative">
               
                
                    <AttendanceCalModal month={month} year={year} noOfDays={noOfDays} isToday={isToday} isHoliday={isHoliday} isAttendance={isAttendance} setMonth={setMonth} setYear={setYear} selectedate={date} handleDateClick={handleDateClick} SelectedDate={selectedDate} setcurrentDay={setCurrentDay} activeDate={activeDate} handleMonthChange={handleMonthChange}/>
        
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default DatePicker;
