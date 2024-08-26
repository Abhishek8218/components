import React from 'react';
interface DateModalProps {
    month: number;
    year: number;
    blankDays: number[];
    noOfDays: number[];
    handleDateSelection: (date: number) => void;
    isToday: (date: number) => boolean;
    isBanned: (date: number) => boolean;
    isImportant: (date: number) => boolean;
    setStartDate: (startDate: string) => void;
    setEndDate: (endDate: string) => void;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    handleMonthModal: () => void;
    handleYearModal: () => void;
    startDate: string;
    endDate: string;
    onConfirm: () => void;
    onReset: () => void;
    handleDateRangerClose: () => void;
    setIsSelectingStartDate: (isSelectingStartDate: boolean) => void;
}
declare const MobileDateModal: ({ month, year, blankDays, noOfDays, handleDateSelection, isToday, isBanned, isImportant, setStartDate, setEndDate, setMonth, setYear, handleMonthModal, handleYearModal, startDate, endDate, onConfirm, onReset, handleDateRangerClose, setIsSelectingStartDate, }: DateModalProps) => React.JSX.Element;
export default MobileDateModal;
//# sourceMappingURL=mobileDateModal.d.ts.map