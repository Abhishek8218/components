import React from 'react';
interface MobileYearModalProps {
    year: number;
    showYearModal: boolean;
    handleYearSelect: (selectedYear: number) => void;
    handleYearModalClose: () => void;
    setCurrentYear: () => void;
}
declare const MobileYearModal: ({ year, showYearModal, handleYearSelect, handleYearModalClose, setCurrentYear }: MobileYearModalProps) => React.JSX.Element;
export default MobileYearModal;
//# sourceMappingURL=YearModal.d.ts.map