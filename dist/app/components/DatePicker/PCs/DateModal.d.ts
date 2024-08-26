import React from "react";
interface DateModalProps {
    month: number;
    year: number;
    selectedate: string;
    blankDays: number[];
    noOfDays: number[];
    getDateValue: (date: number) => void;
    isToday: (date: number) => boolean;
    isBanned: (date: number) => boolean;
    isImportant: (date: number) => boolean;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    handleMonthModal: () => void;
    handleYearModal: () => void;
    onConfirm: () => void;
    onReset: () => void;
    handleDateClick: (date: number) => void;
    SelectedDate: number;
    activeDate: string;
    setcurrentDay: () => void;
}
declare const DateModal: ({ month, year, selectedate, blankDays, noOfDays, getDateValue, isToday, isBanned, isImportant, setMonth, setYear, handleMonthModal, handleYearModal, onConfirm, onReset, handleDateClick, SelectedDate, setcurrentDay, activeDate, }: DateModalProps) => React.JSX.Element;
export default DateModal;
//# sourceMappingURL=DateModal.d.ts.map