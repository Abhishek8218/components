import React from 'react';
interface MonthModalProps {
    month: number;
    showMonthModal: boolean;
    handleMonthSelect: (selectedMonth: number) => void;
    handleMonthModalClose: () => void;
    setCurrentMonth: () => void;
}
declare const MonthModal: ({ month, showMonthModal, handleMonthSelect, handleMonthModalClose, setCurrentMonth }: MonthModalProps) => React.JSX.Element;
export default MonthModal;
//# sourceMappingURL=MonthModal.d.ts.map