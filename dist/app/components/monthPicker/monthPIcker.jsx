import React, { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import MonthModal from "./PCs/MonthModal";
import MobileMonthModal from "./Android/MonthModal";
var MonthPicker = function () {
    var _a = useState(false), showMonthModal = _a[0], setShowMonthModal = _a[1];
    var _b = useState(""), date = _b[0], setDate = _b[1];
    var _c = useState(new Date().getMonth()), month = _c[0], setMonth = _c[1];
    var year = useState(new Date().getFullYear())[0]; // Year is always the current year
    // Format a date into a "dd-mm-yyyy" string
    var formatDate = function (day, month, year) {
        var formattedDay = String(day).padStart(2, "0");
        var formattedMonth = String(month + 1).padStart(2, "0"); // Months are zero-based
        return "".concat(formattedDay, "-").concat(formattedMonth, "-").concat(year);
    };
    // Update the selected date when month is selected
    var updateDate = function (month) {
        setDate(formatDate(1, month, year)); // Set the day as 1st
    };
    // Functions to handle the month modal
    var handleMonthModal = function () {
        setShowMonthModal(true);
    };
    var handleMonthModalClose = function () {
        setShowMonthModal(false);
    };
    var handleMonthSelect = function (selectedMonth) {
        setMonth(selectedMonth);
        setShowMonthModal(false);
        updateDate(selectedMonth);
    };
    var closeModals = function () {
        setShowMonthModal(false);
    };
    // Function to set the current month
    var setCurrentMonth = function () {
        setMonth(new Date().getMonth());
        setShowMonthModal(false);
        updateDate(new Date().getMonth());
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
      {showMonthModal && (<div className="fixed inset-0 min-h-full bg-opacity-50 z-40" onClick={closeModals}/>)}
     <div className={"flex items-center justify-center relative ".concat(isMobile ? "" : "z-50", " ")}>
        <div className="antialiased sans-serif">
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
              <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Month
              </label>
              <div className="relative">
                <input type="hidden" name="date"/>
                <input type="text" readOnly value={date} onClick={handleMonthModal} onKeyDown={function (e) {
            if (e.key === "Escape")
                closeModals();
        }} className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" placeholder="Select date"/>

                {date ? (<div className="absolute top-0 right-0 px-3 py-2">
                    <MaterialSymbol icon="close" size={28} color="gray" onClick={resetDate}/>
                  </div>) : (<div className="absolute top-0 right-0 px-3 py-2" onClick={handleMonthModal}>
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>)}

                {showMonthModal &&
            (isMobile ? (<MobileMonthModal month={month} showMonthModal={showMonthModal} handleMonthSelect={handleMonthSelect} handleMonthModalClose={handleMonthModalClose} setCurrentMonth={setCurrentMonth}/>) : (<MonthModal month={month} showMonthModal={showMonthModal} handleMonthSelect={handleMonthSelect} handleMonthModalClose={handleMonthModalClose} setCurrentMonth={setCurrentMonth}/>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default MonthPicker;
