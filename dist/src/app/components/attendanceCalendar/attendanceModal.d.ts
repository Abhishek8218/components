import React from "react";
interface AttendanceCalModalProps {
    month: number;
    year: number;
    selectedate: string;
    noOfDays: number[];
    isToday: (date: number) => boolean;
    isHoliday: (date: number) => boolean;
    isAttendance: (date: number) => boolean;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    handleDateClick: (date: number) => void;
    SelectedDate: number;
    activeDate: string;
    setcurrentDay: () => void;
    handleMonthChange: (direction: 'previous' | 'next') => void;
}
declare const AttendanceCalModal: ({ month, year, selectedate, noOfDays, isToday, isHoliday, isAttendance, handleDateClick, SelectedDate, activeDate, handleMonthChange }: AttendanceCalModalProps) => React.JSX.Element;
export default AttendanceCalModal;
//# sourceMappingURL=attendanceModal.d.ts.map