import React from 'react';
interface MonthModalProps {
    month: number;
    showMonthModal: boolean;
    handleMonthSelect: (selectedMonth: number) => void;
    handleMonthModalClose: () => void;
}
declare const MonthModal: ({ month, showMonthModal, handleMonthSelect, handleMonthModalClose }: MonthModalProps) => React.JSX.Element;
export default MonthModal;
//# sourceMappingURL=monthDateModal.d.ts.map