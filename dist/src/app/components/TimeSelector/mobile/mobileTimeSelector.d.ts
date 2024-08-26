interface TimePickerModalProps {
    hour: number;
    minute: number;
    ampm: 'AM' | 'PM';
    onChange: (hour: number, minute: number, ampm: 'AM' | 'PM') => void;
    onClose: () => void;
    onReset: () => void;
}
declare const MobileTimePickerModal: React.FC<TimePickerModalProps>;
export default MobileTimePickerModal;
//# sourceMappingURL=mobileTimeSelector.d.ts.map