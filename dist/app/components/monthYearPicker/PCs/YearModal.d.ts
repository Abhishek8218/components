import React from 'react';
interface YearModalProps {
    year: number;
    showYearModal: boolean;
    handleYearSelect: (selectedYear: number) => void;
    handleYearModalClose: () => void;
    setCurrentYear: () => void;
}
declare const YearModal: ({ year, showYearModal, handleYearSelect, handleYearModalClose, setCurrentYear }: YearModalProps) => React.JSX.Element;
export default YearModal;
//# sourceMappingURL=YearModal.d.ts.map