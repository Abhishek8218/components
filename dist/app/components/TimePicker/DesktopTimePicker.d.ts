import React from 'react';
interface TimePickerModalProps {
    selectedTime: string;
    hours: number[];
    minutes: number[];
    onSelect: (hour: number, minute: number) => void;
    onClose: () => void;
}
declare const TimePickerModal: ({ selectedTime, hours, minutes, onSelect, onClose, }: TimePickerModalProps) => React.JSX.Element;
export default TimePickerModal;
//# sourceMappingURL=DesktopTimePicker.d.ts.map