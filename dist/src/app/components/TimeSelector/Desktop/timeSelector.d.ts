interface TimePickerModalProps {
    hour: number;
    minute: number;
    ampm: 'AM' | 'PM';
    onChange: (hour: number, minute: number, ampm: 'AM' | 'PM') => void;
    onClose: () => void;
    onReset: () => void;
}
declare const TimePickerModal: React.FC<TimePickerModalProps>;
export default TimePickerModal;
//# sourceMappingURL=timeSelector.d.ts.map