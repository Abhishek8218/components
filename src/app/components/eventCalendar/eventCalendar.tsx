import React, { useState, useEffect } from 'react';
import WeekDateModal from './desktop/weekCalendar'; // Ensure you have this modal component
import AgendaModal from './agendaModal'; // Import the new agenda modal component
import { format, startOfWeek, addWeeks, subWeeks, isToday } from 'date-fns';

type AgendaItem = {
    date: Date;
    agendas: { title: string; time?: string, isAllDay?: boolean; }[];
};

const EventCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [weekStartDate, setWeekStartDate] = useState<Date>(startOfWeek(new Date()));

    // Sample demo agenda items around August 10, 2024
    const demoAgendas: AgendaItem[] = [
        { date: new Date(2024, 7, 9), agendas: [
            { title: 'Meeting with John', time: '10:00 AM' },
            { title: 'Lunch with client', time: '12:30 PM' },
            { title: 'Project deadline', time: 'End of day' },
            { title: 'Prepare presentation', time: '3:00 PM', isAllDay: true }
        ]},
        { date: new Date(2024, 7, 10), agendas: [
            { title: 'Project deadline', time: 'End of day' },
            { title: 'Prepare presentation', time: '3:00 PM' }
        ]},
        { date: new Date(2024, 7, 11), agendas: [
            { title: 'Client presentation', time: '11:00 AM' }
        ]},
        { date: new Date(2024, 7, 12), agendas: [
            { title: 'Review feedback', time: '4:00 PM' },
            { title: 'Team building activity', time: '2:00 PM' },
        ]},
        { date: new Date(2024, 7, 13), agendas: [
            { title: 'Weekly review', time: '9:00 AM' }
        ]},
        { date: new Date(2024, 7, 14), agendas: [
            { title: 'Company event', time: '6:00 PM' },
            { title: 'Networking session', time: '8:00 PM' }
        ]},
    ];

    useEffect(() => {
        // Ensure the selectedDate is within the current week view
        setWeekStartDate(startOfWeek(selectedDate));
    }, [selectedDate]);

    const handleDateSelection = (date: Date) => {
        setSelectedDate(date);
        setWeekStartDate(startOfWeek(date));
    };

    const handleWeekChange = (increment: boolean) => {
        setWeekStartDate(prevDate => {
            const newDate = increment ? addWeeks(prevDate, 1) : subWeeks(prevDate, 1);
            return newDate;
        });
    };

    const formatDate = (date: Date | null) => {
        return date ? format(date, 'dd-MM-yyyy') : 'Select a date';
    };

    const getAgendasForDate = (date: Date) => {
        return demoAgendas.find(agenda => agenda.date.toDateString() === date.toDateString())?.agendas || [];
    };

    return (
        <div className='w-80'>
            <div className="flex justify-between items-center mb-4 bg-gray-100 rounded-md px-2 border-b border-gray-400">
                <span className="text-base font-semibold text-gray-800">
                    {format(weekStartDate, 'MMMM yyyy')}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleWeekChange(false)}
                        className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 3l-7 7 7 7"
                            />
                        </svg>
                    </button>



<button className='text-blue-500' onClick={() => handleDateSelection(new Date())}>Today</button>


                    <button
                        onClick={() => handleWeekChange(true)}
                        className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 19l7-7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1 text-center text-[10px] font-medium border-b border-gray-300 pb-1">
                <div className="text-gray-700">S</div>
                <div className="text-gray-700">M</div>
                <div className="text-gray-700">T</div>
                <div className="text-gray-700">W</div>
                <div className="text-gray-700">T</div>
                <div className="text-gray-700">F</div>
                <div className="text-gray-700">S</div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 7 }, (_, i) => {
                    const currentDate = addWeeks(weekStartDate, 0).getDate() + i;
                    const date = new Date(weekStartDate);
                    date.setDate(currentDate);

                    return (
                        <div
                        key={i}
                        className={`p-2 text-center text-[16px] rounded-full cursor-pointer transition duration-150 ${
                            date.toDateString() === selectedDate.toDateString()
                                ? 'bg-blue-500 text-white'
                                : isToday(date)
                                ? 'bg-blue-200 text-blue-800'
                                : 'text-gray-700'
                        }`}
                        onClick={() => handleDateSelection(date)}
                    >
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
            <AgendaModal 
                selectedDate={selectedDate} 
                getAgendasForDate={getAgendasForDate}
            />
            {/* <WeekDateModal
                onDateClick={handleDateSelection}
                weekStartDate={weekStartDate}
                handleDateSelection={handleDateSelection}
         
            /> */}
        </div>
    );
};

export default EventCalendar;
