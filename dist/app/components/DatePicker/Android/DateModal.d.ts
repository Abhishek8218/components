import React from 'react';
interface MobileDateModalProps {
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
    handleDatePickerClose: () => void;
    setcurrentDay: () => void;
}
declare const MobileDateModal: ({ month, year, selectedate, blankDays, noOfDays, getDateValue, isToday, isBanned, isImportant, setMonth, setYear, handleMonthModal, handleYearModal, onConfirm, onReset, handleDateClick, SelectedDate, handleDatePickerClose, activeDate, setcurrentDay }: MobileDateModalProps) => React.JSX.Element;
export default MobileDateModal;
//# sourceMappingURL=DateModal.d.ts.map