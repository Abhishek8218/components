// MobileTimePickerModal.tsx
import React from 'react';

interface MobileTimePickerModalProps {
  selectedTime: string;
  hours: number[];
  minutes: number[];
  onSelect: (hour: number, minute: number) => void;
  onClose: () => void;
}

const MobileTimePickerModal: React.FC<MobileTimePickerModalProps> = ({ selectedTime, hours, minutes, onSelect, onClose }) => {
  const handleTimeSelect = (hour: number, minute: number) => {
    onSelect(hour, minute);
  };

  const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow p-4 pb-1 w-full max-w-md mx-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Select Time</h3>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <h4 className="text-center font-medium">Hours</h4>
              <div className="overflow-y-auto h-48 no-scrollbar">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    id={`hour-${hour}`}
                    onClick={() => handleTimeSelect(hour, selectedMinute)}
                    className={`cursor-pointer text-center p-[2px] rounded transition duration-150 ease-in-out ${selectedHour === hour ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`}
                  >
                    {('0' + hour).slice(-2)}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <h4 className="text-center font-medium">Minutes</h4>
              <div className="overflow-y-auto h-48 no-scrollbar">
                {minutes.map((minute) => (
                  <div
                    key={minute}
                    id={`minute-${minute}`}
                    onClick={() => handleTimeSelect(selectedHour, minute)}
                    className={`cursor-pointer text-center p-[2px] rounded transition duration-150 ease-in-out ${selectedMinute === minute ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`}
                  >
                    {('0' + minute).slice(-2)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 w-full text-center py-2">
          <button onClick={onClose} className="text-base text-center text-blue-500">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default MobileTimePickerModal;
