import React from 'react';
interface MobileMonthModalProps {
    month: number;
    showMonthModal: boolean;
    handleMonthSelect: (selectedMonth: number) => void;
    handleMonthModalClose: () => void;
    setCurrentMonth: () => void;
}
declare const MobileMonthModal: ({ month, showMonthModal, handleMonthSelect, handleMonthModalClose, setCurrentMonth }: MobileMonthModalProps) => React.JSX.Element;
export default MobileMonthModal;
//# sourceMappingURL=mobileMonthModal.d.ts.map