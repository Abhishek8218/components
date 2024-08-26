import React, { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import MonthModal from "./PCs/MonthModal";
import YearModal from "./PCs/YearModal";
import MobileMonthModal from "./Android/MonthModal";
import MobileYearModal from "./Android/YearModal";
var MonthYearPicker = function () {
    var _a = useState(false), showMonthModal = _a[0], setShowMonthModal = _a[1];
    var _b = useState(false), showYearModal = _b[0], setShowYearModal = _b[1];
    var _c = useState(""), date = _c[0], setDate = _c[1];
    var _d = useState(new Date().getMonth()), month = _d[0], setMonth = _d[1];
    var _e = useState(new Date().getFullYear()), year = _e[0], setYear = _e[1];
    var _f = useState(new Date().getDate()), selectedDate = _f[0], setSelectedDate = _f[1];
    var _g = useState(""), activeDate = _g[0], setActiveDate = _g[1];
    // Format a date into a "dd-mm-yyyy" string
    var formatDate = function (day, month, year) {
        var formattedDay = String(day).padStart(2, "0");
        var formattedMonth = String(month + 1).padStart(2, "0"); // Months are zero-based
        return "".concat(formattedDay, "-").concat(formattedMonth, "-").concat(year);
    };
    // Update the selected date,Month and Year when they are clicked is clicked
    // Update the selected date when month or year is selected
    var updateDate = function (month, year) {
        setDate(formatDate(1, month, year)); // Set the day as 1st
    };
    console.log("date is ", date);
    //Functions to handle the month and year modals
    var handleMonthModal = function () {
        setShowMonthModal(true);
    };
    var handleMonthModalClose = function () {
        setShowMonthModal(false);
    };
    var handleYearModal = function () {
        setShowYearModal(true);
    };
    var handleMonthSelect = function (selectedMonth) {
        setMonth(selectedMonth);
        setShowMonthModal(false);
        updateDate(selectedMonth, year);
    };
    var handleYearSelect = function (selectedYear) {
        setYear(selectedYear);
        setShowYearModal(false);
        setShowMonthModal(true);
        updateDate(month, selectedYear);
    };
    var handleYearModalClose = function () {
        setShowYearModal(false);
    };
    var closeModals = function () {
        setShowYearModal(false);
        setShowMonthModal(false);
    };
    // Function to set the current month
    var setCurrentMonth = function () {
        setMonth(new Date().getMonth());
        setShowMonthModal(false);
        updateDate(new Date().getMonth(), year);
    };
    // Function to set the current year
    var setCurrentYear = function () {
        setYear(new Date().getFullYear());
        setShowYearModal(false);
        setShowMonthModal(true);
        updateDate(month, new Date().getFullYear());
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
      {(showYearModal || showMonthModal) && (<div className="fixed inset-0 min-h-full bg-opacity-50 z-40" onClick={closeModals}/>)}
      <div className={"flex items-center justify-center relative ".concat(isMobile ? "" : "z-50", " ")}>
        <div className="antialiased sans-serif">
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
              <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Month & Year
              </label>
              <div className="relative">
                <input type="hidden" name="date"/>
                <input type="text" readOnly value={date} onClick={function () { return setShowYearModal(!showYearModal); }} onKeyDown={function (e) {
            if (e.key === "Escape")
                closeModals();
        }} className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" placeholder="Select date"/>

                {date ? (<div className="absolute top-0 right-0 px-3 py-2">
                  <MaterialSymbol icon="close" size={28} color="gray" onClick={resetDate}/>
                </div>) : (<div className="absolute top-0 right-0 px-3 py-2" onClick={function () { return setShowYearModal(!showYearModal); }}>
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>)}
             
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
export default MonthYearPicker;
