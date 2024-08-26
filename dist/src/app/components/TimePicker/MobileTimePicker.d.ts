import React from 'react';
interface IMobileTimePickerModalProps {
    selectedTime: string;
    hours: number[];
    minutes: number[];
    onSelect: (hour: number, minute: number) => void;
    onClose: () => void;
}
declare const MobileTimePickerModal: ({ selectedTime, hours, minutes, onSelect, onClose, }: IMobileTimePickerModalProps) => React.JSX.Element;
export default MobileTimePickerModal;
//# sourceMappingURL=MobileTimePicker.d.ts.map