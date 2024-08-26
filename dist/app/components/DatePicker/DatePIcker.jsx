import React, { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import DateModal from "./PCs/DateModal";
import MonthModal from "./PCs/MonthModal";
import YearModal from "./PCs/YearModal";
import MobileDateModal from "./Android/DateModal";
import MobileMonthModal from "./Android/MonthModal";
import MobileYearModal from "./Android/YearModal";
var DatePicker = function () {
    var _a = useState(false), showDatepicker = _a[0], setShowDatepicker = _a[1];
    var _b = useState(false), showMonthModal = _b[0], setShowMonthModal = _b[1];
    var _c = useState(false), showYearModal = _c[0], setShowYearModal = _c[1];
    var _d = useState(""), date = _d[0], setDate = _d[1];
    var _e = useState(new Date().getMonth()), month = _e[0], setMonth = _e[1];
    var _f = useState(new Date().getFullYear()), year = _f[0], setYear = _f[1];
    var _g = useState([]), noOfDays = _g[0], setNoOfDays = _g[1];
    var _h = useState([]), blankDays = _h[0], setBlankDays = _h[1];
    var _j = useState(new Date().getDate()), selectedDate = _j[0], setSelectedDate = _j[1];
    var _k = useState(""), activeDate = _k[0], setActiveDate = _k[1];
    // Banned and important dates mapped by month (0-based index for months)
    var bannedDatesByMonth = {
        0: [2, 5, 7, 8],
        7: [2, 4, 5, 7],
    };
    var importantDatesByMonth = {
        0: [1, 10, 15],
        7: [3, 12, 18],
    };
    // Utility functions to check if a date is today, banned, or important
    var isToday = function (date) { return new Date().toDateString() === new Date(year, month, date).toDateString(); };
    var isBanned = function (date) { var _a; return ((_a = bannedDatesByMonth[month]) === null || _a === void 0 ? void 0 : _a.includes(date)) || false; };
    var isImportant = function (date) { var _a; return ((_a = importantDatesByMonth[month]) === null || _a === void 0 ? void 0 : _a.includes(date)) || false; };
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
        setBlankDays(blankdaysArray);
        setNoOfDays(daysArray);
    }, [month, year]);
    // Format a date into a "dd-mm-yyyy" string
    var formatDate = function (date) {
        var day = String(date.getDate()).padStart(2, "0");
        var month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        var year = date.getFullYear();
        return "".concat(day, "-").concat(month, "-").concat(year);
    };
    // Update the selected date,Month and Year when they are clicked is clicked
    var updateDate = function (selectedDate, month, year) {
        var currentSelectedDate = new Date(year, month, selectedDate);
        setDate(formatDate(currentSelectedDate));
    };
    // Handle clicking on a date in the date picker
    var handleDateClick = function (date) {
        handleActiveDate(date);
        if (!isBanned(date)) {
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
    //Functions to handle the month and year modals
    var handleMonthModal = function () {
        setShowMonthModal(true);
        setShowDatepicker(false);
    };
    var handleMonthModalClose = function () {
        setShowMonthModal(false);
        setShowDatepicker(true);
    };
    var handleYearModal = function () {
        setShowYearModal(true);
        setShowDatepicker(false);
    };
    var handleMonthSelect = function (selectedMonth) {
        setMonth(selectedMonth);
        setShowMonthModal(false);
        setShowDatepicker(true);
        updateDate(selectedDate, selectedMonth, year);
    };
    var handleYearSelect = function (selectedYear) {
        setYear(selectedYear);
        setShowYearModal(false);
        setShowDatepicker(true);
        updateDate(selectedDate, month, selectedYear);
    };
    var handleYearModalClose = function () {
        setShowDatepicker(true);
        setShowYearModal(false);
        setShowDatepicker(true);
    };
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
    // Function to reset the date
    var resetDate = function () {
        setDate("");
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
              <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Date
              </label>
              <div className="relative">
                <input type="hidden" name="date"/>
                <input type="text" readOnly value={date} onClick={function () { return setShowDatepicker(!showDatepicker); }} onKeyDown={function (e) {
            if (e.key === "Escape")
                setShowDatepicker(false);
        }} className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" placeholder="Select date"/>

                {date ? (<div className="absolute top-0 right-0 px-3 py-2">
                  <MaterialSymbol icon="close" size={28} color="gray" onClick={resetDate}/>
                </div>) : (<div className="absolute top-0 right-0 px-3 py-2" onClick={function () { return setShowDatepicker(!showDatepicker); }}>
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>)}
             

                {showDatepicker &&
            (isMobile ? (<MobileDateModal month={month} year={year} blankDays={blankDays} noOfDays={noOfDays} getDateValue={getDateValue} isToday={isToday} isBanned={isBanned} isImportant={isImportant} setMonth={setMonth} setYear={setYear} handleMonthModal={handleMonthModal} handleYearModal={handleYearModal} onConfirm={closeModals} onReset={resetDate} selectedate={date} handleDateClick={handleDateClick} SelectedDate={selectedDate} activeDate={activeDate} handleDatePickerClose={closeModals} setcurrentDay={setCurrentDay}/>) : (<DateModal month={month} year={year} blankDays={blankDays} noOfDays={noOfDays} getDateValue={getDateValue} isToday={isToday} isBanned={isBanned} isImportant={isImportant} setMonth={setMonth} setYear={setYear} handleMonthModal={handleMonthModal} handleYearModal={handleYearModal} onConfirm={closeModals} onReset={resetDate} selectedate={date} handleDateClick={handleDateClick} SelectedDate={selectedDate} activeDate={activeDate} setcurrentDay={setCurrentDay}/>))}
                {showMonthModal &&
            (isMobile ? (<MobileMonthModal month={month} showMonthModal={showMonthModal} handleMonthSelect={handleMonthSelect} handleMonthModalClose={handleMonthModalClose} setCurrentMonth={setCurrentMonth}/>) : (<MonthModal month={month} showMonthModal={showMonthModal} handleMonthSelect={handleMonthSelect} handleMonthModalClose={handleMonthModalClose} setCurrentMonth={setCurrentMonth}/>))}
                {showYearModal &&
            (isMobile ? (<MobileYearModal year={year} showYearModal={showYearModal} handleYearSelect={handleYearSelect} handleYearModalClose={handleYearModalClose} setCurrentYear={setCurrentYear}/>) : (<YearModal year={year} showYearModal={showYearModal} handleYearSelect={handleYearSelect} handleYearModalClose={handleYearModalClose} setCurrentYear={setCurrentYear}/>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default DatePicker;
