import React, { useRef, useEffect, useState } from 'react';

interface TimePickerModalProps {
  selectedTime: string;
  hours: number[];
  minutes: number[];
  onSelect: (hour: number, minute: number) => void;
  onClose: () => void;
}

const ITEM_HEIGHT = 40;

const TimePickerModal = ({
  selectedTime,
  hours,
  minutes,
  onSelect,
  onClose,
}: TimePickerModalProps) => {
  const [selectedHour, setSelectedHour] = useState<number>(parseInt(selectedTime.split(':')[0]));
  const [selectedMinute, setSelectedMinute] = useState<number>(parseInt(selectedTime.split(':')[1]));

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const duplicateItems = (arr: number[]) => [...arr, ...arr, ...arr]; // Tripling the array

  const extendedHours = duplicateItems(hours);
  const extendedMinutes = duplicateItems(minutes);

  const middleHourIndex = extendedHours.length / 3;
  const middleMinuteIndex = extendedMinutes.length / 3;

  const scrollToSelected = () => {
    if (hourRef.current && minuteRef.current) {
      const initialHourScroll = middleHourIndex * ITEM_HEIGHT + hours.indexOf(selectedHour) * ITEM_HEIGHT;
      const initialMinuteScroll = middleMinuteIndex * ITEM_HEIGHT + minutes.indexOf(selectedMinute) * ITEM_HEIGHT;

      hourRef.current.scrollTop = initialHourScroll;
      minuteRef.current.scrollTop = initialMinuteScroll;
    }
  };

  useEffect(() => {
    scrollToSelected();
  }, []);

  const handleHourScroll = () => {
    if (hourRef.current) {
      const scrollPosition = hourRef.current.scrollTop;
      const index = Math.round(scrollPosition / ITEM_HEIGHT);
      const actualIndex = index % hours.length;

      if (scrollPosition < ITEM_HEIGHT * 0.5) {
        hourRef.current.scrollTop = (middleHourIndex + actualIndex) * ITEM_HEIGHT;
      } else if (scrollPosition > hourRef.current.scrollHeight - hourRef.current.clientHeight - ITEM_HEIGHT * 0.5) {
        hourRef.current.scrollTop = (middleHourIndex + actualIndex) * ITEM_HEIGHT;
      }

      setSelectedHour(hours[actualIndex]);
    }
  };

  const handleMinuteScroll = () => {
    if (minuteRef.current) {
      const scrollPosition = minuteRef.current.scrollTop;
      const index = Math.round(scrollPosition / ITEM_HEIGHT);
      const actualIndex = index % minutes.length;

      if (scrollPosition < ITEM_HEIGHT * 0.5) {
        minuteRef.current.scrollTop = (middleMinuteIndex + actualIndex) * ITEM_HEIGHT;
      } else if (scrollPosition > minuteRef.current.scrollHeight - minuteRef.current.clientHeight - ITEM_HEIGHT * 0.5) {
        minuteRef.current.scrollTop = (middleMinuteIndex + actualIndex) * ITEM_HEIGHT;
      }

      setSelectedMinute(minutes[actualIndex]);
    }
  };

  const handleSubmit = () => {
    onSelect(selectedHour, selectedMinute);
    onClose();
  };

  return (
    <div className=" inset-0  bg-opacity-60 flex justify-center items-center z-50">
    <div className=" bg-white rounded-lg shadow p-4 pb-1 min-w-[270px]  ml-4 mt-1">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Select Time</h3>
          <div className="flex space-x-4 w-full">
            <div className="w-1/2">
              <h4 className="text-center font-medium">Hours</h4>
              <div
                className="overflow-y-auto h-48 no-scrollbar"
                ref={hourRef}
                onScroll={handleHourScroll}
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex flex-col items-center pt-[60%]">
                  {extendedHours.map((hour, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer text-center text-sm py-2 transition duration-150 ease-in-out ${
                        selectedHour === hour ? 'text-blue-500 text-lg font-bold' : 'text-gray-700 text-lg'
                      }`}
                      style={{ height: ITEM_HEIGHT }}
                    >
                      {('0' + hour).slice(-2)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h4 className="text-center font-medium">Minutes</h4>
              <div
                className="overflow-y-auto h-48 no-scrollbar"
                ref={minuteRef}
                onScroll={handleMinuteScroll}
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex flex-col items-center pt-[60%] no-scrollbar">
                  {extendedMinutes.map((minute, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer text-center  text-sm py-2 transition duration-150 ease-in-out ${
                        selectedMinute === minute ? 'text-blue-500 text-lg font-bold' : 'text-gray-700 text-lg'
                      }`}
                      style={{ height: ITEM_HEIGHT }}
                    >
                      {('0' + minute).slice(-2)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 w-full text-center py-2 flex flex-row justify-between items-center px-12">
          <button onClick={onClose} className="text-base text-center text-gray-500">Close</button>
          <button onClick={handleSubmit} className="text-base text-center text-blue-500">Set</button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;
