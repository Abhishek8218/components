import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

interface TimePickerModalProps {
  hour: number;
  minute: number;
  ampm: 'AM' | 'PM';
  onChange: (hour: number, minute: number, ampm: 'AM' | 'PM') => void;
  onClose: () => void;
  onReset: () => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ hour, minute, ampm, onChange, onClose,onReset }) => {
  const [selectedHour, setSelectedHour] = useState<number>(hour);
  const [selectedMinute, setSelectedMinute] = useState<number>(minute);
  const [selectedAmpm, setSelectedAmpm] = useState<'AM' | 'PM'>(ampm);

  const adjustHour = (amount: number) => {
    setSelectedHour((prev) => {
      const newHour = prev + amount;
      if (newHour > 12) return 12;
      if (newHour < 1) return 1;
      return newHour;
    });
  };

  const adjustMinute = (amount: number) => {
    setSelectedMinute((prev) => {
      const newMinute = prev + amount;
      if (newMinute > 59) return 59;
      if (newMinute < 0) return 0;
      return newMinute;
    });
  };

  const adjustAmpm = (direction: 'up' | 'down') => {
    setSelectedAmpm((prev) => {
      if (direction === 'up') {
        return prev === 'AM' ? 'PM' : 'AM';
      } else {
        return prev === 'PM' ? 'AM' : 'PM';
      }
    });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 12) {
      setSelectedHour(12);
    } else if (value < 1) {
      setSelectedHour(0);
    } else {
      setSelectedHour(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 59) {
      setSelectedMinute(59);
    } else if (value < 0) {
      setSelectedMinute(0);
    } else {
      setSelectedMinute(value);
    }
  };

  return (
    <div
      className="absolute left-0 right-0 flex items-center justify-center mt-3"
      tabIndex={0}
    >
      <div className="bg-white pt-6 pb-2 px-3 rounded-lg shadow border border-gray-300 flex flex-col items-center">
      <MaterialSymbol icon="close" fill size={28} color="gray" className="absolute top-2 right-[-30px] hover:bg-gray-200  rounded-full" onClick={onClose} />
        <div className="flex flex-col">
          <div className="flex items-center justify-center mb-4 mt-4">
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-600 mb-1">Hour</label>
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => adjustHour(1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={28} className="rotate-[-90deg] hover:bg-gray-200  rounded-full hover:bg-gray-200  rounded-full" />
                </button>

                <input
                  type="number"
                  value={selectedHour}
                  onChange={handleHourChange}
                  className="border border-gray-300 rounded-md p-2 w-14 text-center"
                  min="1"
                  max="12"
                />
                <button onClick={() => adjustHour(-1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={28} className="rotate-90 hover:bg-gray-200  rounded-full" />
                </button>
              </div>
            </div>
            <span className="text-lg mx-2">:</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-600 mb-1">Minute</label>
              <div className="flex flex-col items-center">
                <button onClick={() => adjustMinute(1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={28} className="rotate-[-90deg] hover:bg-gray-200  rounded-full" />
                </button>
                <input
                  type="number"
                  value={selectedMinute}
                  onChange={handleMinuteChange}
                  className="border border-gray-300 rounded-md p-2 w-14 text-center"
                  min="0"
                  max="59"
                />
                <button onClick={() => adjustMinute(-1)} className="text-gray-500 ">
                  <MaterialSymbol icon="chevron_right" size={28} className="rotate-90 hover:bg-gray-200  rounded-full" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center ml-4">
              <label className="text-xs text-gray-600 mb-1">AM/PM</label>
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => adjustAmpm('up')} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={28} className="rotate-[-90deg] hover:bg-gray-200  rounded-full" />
                </button>
                <input
                  type="text"
                  value={selectedAmpm}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-14 text-center"
                />
                <button onClick={() => adjustAmpm('down')} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={28} className="rotate-90 hover:bg-gray-200  rounded-full" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-14 mt-2 w-full">
            <button
              onClick={() => onChange(selectedHour, selectedMinute, selectedAmpm)}
              className="text-blue-500 rounded-lg text-sm hover:scale-105 hover:text-blue-600 transition ease-in-out duration-100"
            >
              Confirm
            </button>
            <button
              onClick={onReset}
              className="text-gray-600 text-sm hover:scale-105 hover:text-red-500 transition ease-in-out duration-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;
