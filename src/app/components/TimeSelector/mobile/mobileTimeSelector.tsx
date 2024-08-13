'use client';

import { useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

interface TimePickerModalProps {
  hour: number;
  minute: number;
  ampm: 'AM' | 'PM';
  onChange: (hour: number, minute: number, ampm: 'AM' | 'PM') => void;
  onClose: () => void;
  onReset: () => void;
}

const MobileTimePickerModal: React.FC<TimePickerModalProps> = ({ hour, minute, ampm, onChange, onClose,onReset }) => {
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
      setSelectedHour(1);
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

  useEffect(() => {
    // Disable scrolling on the background
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white pt-8 pb-4 px-4 rounded-lg shadow-lg border border-gray-300 flex flex-col justify-center items-center min-h-[372px] min-w-[372px]">
        <MaterialSymbol icon="close" fill size={32} color="gray" className="w-full hover:bg-gray-200  rounded-full text-end mr-10" onClick={onClose} />
        
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center justify-center mb-6 mt-6 ">
            <div className="flex flex-col items-center">
              <label className="text-base text-gray-600 mb-2">Hour</label>
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => adjustHour(1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-[-90deg]" />
                </button>

                <input
                  type="number"
                  value={selectedHour}
                  onChange={handleHourChange}
                  className="border border-gray-300 rounded-md p-3 w-20 text-center text-lg"
                  min="1"
                  max="12"
                />
                <button onClick={() => adjustHour(-1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-90" />
                </button>
              </div>
            </div>
            <span className="text-xl mx-4">:</span>
            <div className="flex flex-col items-center">
              <label className="text-base text-gray-600 mb-2">Minute</label>
              <div className="flex flex-col items-center">
                <button onClick={() => adjustMinute(1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-[-90deg]" />
                </button>
                <input
                  type="number"
                  value={selectedMinute}
                  onChange={handleMinuteChange}
                  className="border border-gray-300 rounded-md p-3 w-20 text-center text-lg"
                  min="0"
                  max="59"
                />
                <button onClick={() => adjustMinute(-1)} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-90" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center ml-6">
              <label className="text-base text-gray-600 mb-2">AM/PM</label>
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => adjustAmpm('up')} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-[-90deg]" />
                </button>
                <input
                  type="text"
                  value={selectedAmpm}
                  readOnly
                  className="border border-gray-300 rounded-md p-3 w-20 text-center text-lg"
                />
                <button onClick={() => adjustAmpm('down')} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-90" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-40 mt-4 w-full">
            <button
              onClick={() => onChange(selectedHour, selectedMinute, selectedAmpm)}
              className="text-blue-500 rounded-lg text-lg hover:scale-105 hover:text-blue-600 transition ease-in-out duration-100"
            >
              Confirm
            </button>
            <button
              onClick={onReset}
              className="text-black text-lg hover:scale-105 hover:text-red-500 transition ease-in-out duration-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTimePickerModal;
