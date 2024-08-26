import React from 'react';
interface YearModalProps {
    year: number;
    showYearModal: boolean;
    handleYearSelect: (selectedYear: number) => void;
    handleYearModalClose: () => void;
}
declare const YearModal: ({ year, showYearModal, handleYearSelect, handleYearModalClose }: YearModalProps) => React.JSX.Element;
export default YearModal;
//# sourceMappingURL=yearDateModal.d.ts.map