'use client';
import React, { useState, useRef, useEffect } from 'react';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isToday, parse } from 'date-fns';
import AgendaModal from './agendaModal'; // Importing the AgendaModal component
var EventCalendar = function () {
    var _a = useState(startOfWeek(new Date())), currentWeekStart = _a[0], setCurrentWeekStart = _a[1];
    var _b = useState(new Date()), selectedDate = _b[0], setSelectedDate = _b[1];
    var scrollRef = useRef(null);
    var parseDateFromApi = function (dateString) {
        return parse(dateString, 'dd-MM-yyyy', new Date());
    };
    var demoAgendas = [
        {
            date: parseDateFromApi('09-08-2024'),
            agendas: [
                { title: 'Meeting with John', time: '10:00 AM' },
                { title: 'Lunch with client', time: '12:30 PM' },
                { title: 'Project deadline', time: 'End of day' },
                { title: 'Prepare presentation', time: '3:00 PM' },
            ],
        },
        {
            date: parseDateFromApi('10-08-2024'),
            agendas: [
                { title: 'Project deadline', time: 'End of day' },
                { title: 'Prepare presentation', time: '3:00 PM' },
            ],
        },
        {
            date: parseDateFromApi('11-08-2024'),
            agendas: [{ title: 'Client presentation', time: '11:00 AM' }],
        },
        {
            date: parseDateFromApi('12-08-2024'),
            agendas: [
                { title: 'Review feedback', time: '4:00 PM' },
                { title: 'Team building activity', time: '2:00 PM' },
            ],
        },
        {
            date: parseDateFromApi('13-08-2024'),
            agendas: [{ title: 'Weekly review', time: '9:00 AM' }],
        },
        {
            date: parseDateFromApi('14-08-2024'),
            agendas: [
                { title: 'Company event', time: '6:00 PM' },
                { title: 'Networking session', time: '8:00 PM' },
            ],
        },
    ];
    // Parsing date from API format (dd-MM-yyyy)
    var handleWeekChange = function (increment) {
        setCurrentWeekStart(function (prevDate) {
            var newDate = increment ? addWeeks(prevDate, 1) : subWeeks(prevDate, 1);
            return newDate;
        });
    };
    var handleDateSelection = function (date) {
        setSelectedDate(date);
        setCurrentWeekStart(startOfWeek(date));
    };
    var preloadWeeks = function () {
        var currentWeek = currentWeekStart;
        var previousWeek = subWeeks(currentWeekStart, 1);
        var nextWeek = addWeeks(currentWeekStart, 1);
        return [previousWeek, currentWeek, nextWeek];
    };
    var handleScroll = function () {
        if (scrollRef.current) {
            var _a = scrollRef.current, scrollLeft = _a.scrollLeft, clientWidth = _a.clientWidth;
            if (scrollLeft === 0) {
                setCurrentWeekStart(function (prevDate) { return subWeeks(prevDate, 1); });
            }
            else if (scrollLeft + clientWidth >= scrollRef.current.scrollWidth) {
                setCurrentWeekStart(function (prevDate) { return addWeeks(prevDate, 1); });
            }
        }
    };
    useEffect(function () {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.clientWidth; // Center the scroll on load
        }
    }, [currentWeekStart]);
    var getAgendasForDate = function (date) {
        var _a;
        return ((_a = demoAgendas.find(function (agenda) { return agenda.date.toDateString() === date.toDateString(); })) === null || _a === void 0 ? void 0 : _a.agendas) || [];
    };
    return (<div className="w-full min-h-[100dvh] select-none">
            <div className="flex justify-between items-center mb-4 bg-gray-100 px-2 border-b border-gray-400 pt-4">
                <span className="text-base font-semibold text-gray-800">
                    {format(currentWeekStart, 'MMMM yyyy')}
                </span>
                <div className="flex gap-2">
                    <button onClick={function () { return handleWeekChange(false); }} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 3l-7 7 7 7"/>
                        </svg>
                    </button>



    <button className='text-blue-500' onClick={function () { return handleDateSelection(new Date()); }}>Today</button>


                    <button onClick={function () { return handleWeekChange(true); }} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19l7-7-7-7"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1 text-center text-xs font-medium border-b border-gray-300 pb-1 pt-2 px-[10px]">
                <div className="text-gray-700">S</div>
                <div className="text-gray-700">M</div>
                <div className="text-gray-700">T</div>
                <div className="text-gray-700">W</div>
                <div className="text-gray-700">T</div>
                <div className="text-gray-700">F</div>
                <div className="text-gray-700">S</div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar" ref={scrollRef} onScroll={handleScroll} style={{ scrollSnapType: 'x mandatory', whiteSpace: 'nowrap' }}>
                {preloadWeeks().map(function (weekStart, index) { return (<div key={index} className="grid grid-cols-7 gap-1 min-w-full no-scrollbar mb-4 p-[10px]" style={{ scrollSnapAlign: 'center' }}>
                        {Array.from({ length: 7 }, function (_, i) {
                var date = addDays(weekStart, i);
                return (<div key={i} className={"p-2 text-center text-[16px] rounded-full cursor-pointer transition duration-150 ".concat(date.toDateString() === selectedDate.toDateString()
                        ? 'bg-blue-500 text-white'
                        : isToday(date)
                            ? 'bg-blue-200 text-blue-800'
                            : 'text-black')} onClick={function () { return setSelectedDate(date); }}>
                                    {date.getDate()}
                                </div>);
            })}
                    </div>); })}
            </div>

            {/* Use the AgendaModal component */}
            <AgendaModal selectedDate={selectedDate} getAgendasForDate={getAgendasForDate}/>
        </div>);
};
export default EventCalendar;
