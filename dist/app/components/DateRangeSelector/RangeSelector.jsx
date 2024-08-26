import React, { useEffect, useState } from 'react';
import DateModal from './Desktop/DateModal';
// import { DAYS, MONTH_NAMES } from 's';
import { format, parse, isValid } from 'date-fns';
import MobileDateModal from './mobile/mobileDateModal';
import MonthModal from './Desktop/monthDateModal';
import YearModal from './Desktop/yearDateModal';
import MobileYearModal from './mobile/mobileYearModal';
import MobileMonthModal from './mobile/mobileMonthModal';
var DateRangePicker = function () {
    // const [month, setMonth] = useState(new Date().getMonth());
    // const [year, setYear] = useState(new Date().getFullYear());
    var _a = useState(new Date().getMonth()), month = _a[0], setMonth = _a[1];
    var _b = useState(new Date().getFullYear()), year = _b[0], setYear = _b[1];
    var _c = useState(""), startDate = _c[0], setStartDate = _c[1];
    var _d = useState(""), endDate = _d[0], setEndDate = _d[1];
    var _e = useState(false), showDateModal = _e[0], setShowDateModal = _e[1];
    var _f = useState(true), isSelectingStartDate = _f[0], setIsSelectingStartDate = _f[1];
    //const [showDatepicker, setShowDatepicker] = useState(false);
    var _g = useState(false), showMonthModal = _g[0], setShowMonthModal = _g[1];
    var _h = useState(false), showYearModal = _h[0], setShowYearModal = _h[1];
    var blankDays = Array(new Date(year, month, 1).getDay()).fill(null);
    var noOfDays = Array.from({ length: new Date(year, month + 1, 0).getDate() }, function (_, i) { return i + 1; });
    var useUserAgent = function () {
        var _a = useState(''), userAgent = _a[0], setUserAgent = _a[1];
        useEffect(function () {
            setUserAgent(navigator.userAgent);
        }, []);
        return userAgent;
    };
    var userAgent = useUserAgent();
    var isMobile = /Mobi|Android|iPad|iPhone|iPod/i.test(userAgent);
    var handleDateSelection = function (date) {
        var selectedDate = new Date(year, month, date);
        if (isNaN(selectedDate.getTime())) {
            console.error("Invalid date at handleDateSelection:", selectedDate);
            return;
        }
        var formattedDate = format(selectedDate, 'dd-MM-yyyy');
        console.log("Formatted Date:", formattedDate);
        if (isSelectingStartDate) {
            console.log("Selected Start Date:", formattedDate);
            setStartDate(formattedDate);
            setIsSelectingStartDate(false);
        }
        else {
            console.log("Selected End Date:", formattedDate);
            setEndDate(formattedDate);
            setIsSelectingStartDate(true);
        }
    };
    var formatDate = function (dateStr) {
        if (!dateStr)
            return '';
        var parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date());
        if (!isValid(parsedDate))
            return 'Invalid Date';
        return format(parsedDate, 'dd-MM-yyyy');
    };
    var handleConfirm = function () {
        setShowDateModal(false);
    };
    var handleReset = function () {
        setStartDate(null);
        setEndDate(null);
        setIsSelectingStartDate(true);
    };
    // const handleMonthSelect = (selectedMonth: number) => {
    //     setMonth(selectedMonth);
    //     setShowMonthModal(false);
    //   };
    var handleInputClick = function () {
        setShowDateModal(true);
    };
    // const handleMonthModal = () => {
    //     // Handle month modal logic if needed
    // };
    // const handleYearModal = () => {
    //     // Handle year modal logic if needed
    // };
    // const getDateValue = (day: number) => {
    //     const selectedDate = new Date(year, month, day);
    //     const formattedDate = formatDate(selectedDate);
    //     setDate(formattedDate);
    //     setShowDateModal(false);
    //   };
    var handleMonthModal = function () {
        setShowMonthModal(true);
        setShowDateModal(false);
    };
    var handleMonthModalClose = function () {
        setShowMonthModal(false);
        setShowDateModal(true);
    };
    var handleYearModal = function () {
        setShowYearModal(true);
        setShowDateModal(false);
    };
    var handleMonthSelect = function (selectedMonth) {
        setMonth(selectedMonth);
        setShowDateModal(true);
        setShowMonthModal(false);
    };
    var handleYearSelect = function (selectedYear) {
        setYear(selectedYear);
        setShowDateModal(true);
        setShowYearModal(false);
    };
    var handleYearModalClose = function () {
        setShowDateModal(true);
        setShowYearModal(false);
    };
    var closeModals = function () {
        setShowDateModal(false);
        setShowYearModal(false);
        setShowMonthModal(false);
    };
    // Function to set the current date
    //   const setCurrentDay = () => {
    //     const today = new Date();
    //     setDate(formatDate(today));
    //     setSelectedDate(today.getDate());
    //   };
    // Function to set the current month
    var setCurrentMonth = function () {
        setMonth(new Date().getMonth());
    };
    // Function to set the current year
    var setCurrentYear = function () {
        setYear(new Date().getFullYear());
    };
    // const formatDisplayDate = (date: string | null) => {
    //     if (!date) return 'Date';
    //     const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    //     return isValid(parsedDate) ? format(parsedDate, 'dd-MM-yyyy') : 'Invalid Date';
    // };
    return (<div className='relative'>
            <label className="font-bold mb-1 text-gray-700 block" htmlFor="datepicker">
                Select Date
            </label>
            <input type="text" readOnly value={"  ".concat(startDate ? startDate : "Start Date").concat(endDate ? " to " : " - ", "  ").concat(endDate ? endDate : "End Date ", " ")} onClick={handleInputClick} className="cursor-pointer border p-2 rounded text-gray-500 w-64 text-center"/>
            {showDateModal && (isMobile ? <MobileDateModal month={month} year={year} blankDays={blankDays} noOfDays={noOfDays} handleDateSelection={handleDateSelection} isToday={function (date) { return new Date().toDateString() === new Date(year, month, date).toDateString(); }} isBanned={function (date) { return false; }} // Define banned dates if needed
         isImportant={function (date) { return false; }} // Define important dates if needed
         setStartDate={setStartDate} setEndDate={setEndDate} setMonth={setMonth} setYear={setYear} handleMonthModal={handleMonthModal} handleYearModal={handleYearModal} startDate={startDate || ''} endDate={endDate || ''} onConfirm={handleConfirm} onReset={handleReset} handleDateRangerClose={function () { return setShowDateModal(false); }} setIsSelectingStartDate={setIsSelectingStartDate}/> :
            <DateModal month={month} year={year} blankDays={blankDays} noOfDays={noOfDays} handleDateSelection={handleDateSelection} isToday={function (date) { return new Date().toDateString() === new Date(year, month, date).toDateString(); }} isBanned={function (date) { return false; }} // Define banned dates if needed
             isImportant={function (date) { return false; }} // Define important dates if needed
             setStartDate={setStartDate} setEndDate={setEndDate} setMonth={setMonth} setYear={setYear} handleMonthModal={handleMonthModal} handleYearModal={handleYearModal} startDate={startDate || ''} endDate={endDate || ''} onConfirm={handleConfirm} onReset={handleReset} handleDateRangerClose={function () { return setShowDateModal(false); }} setIsSelectingStartDate={setIsSelectingStartDate}/>)}
            {showMonthModal && (isMobile ? <MobileMonthModal month={month} showMonthModal={showMonthModal} handleMonthSelect={handleMonthSelect} handleMonthModalClose={handleMonthModalClose} setCurrentMonth={setCurrentMonth}/> :
            <MonthModal month={month} showMonthModal={showMonthModal} handleMonthSelect={handleMonthSelect} handleMonthModalClose={handleMonthModalClose}/>)}
          {showYearModal && (isMobile ? <MobileYearModal year={year} showYearModal={showYearModal} handleYearSelect={handleYearSelect} handleYearModalClose={handleYearModalClose} setCurrentYear={setCurrentYear}/> :
            <YearModal year={year} showYearModal={showYearModal} handleYearSelect={handleYearSelect} handleYearModalClose={handleYearModalClose}/>)}

        </div>);
};
export default DateRangePicker;
