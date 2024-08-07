import React, { useState, useRef, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const TimePicker = () => {
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [hours, setHours] = useState<number[]>(Array.from({ length: 24 }, (_, i) => i));
  const [minutes, setMinutes] = useState<number[]>(Array.from({ length: 60 }, (_, i) => i));
  const timeInputRef = useRef<HTMLInputElement>(null);

  const initTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const formattedTime = `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`;
    setSelectedTime(formattedTime);
    if (timeInputRef.current) {
      timeInputRef.current.value = formattedTime;
    }
  };

  const handleTimeSelect = (hour: number, minute: number) => {
    const formattedTime = `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`;
    setSelectedTime(formattedTime);
    if (timeInputRef.current) {
      timeInputRef.current.value = formattedTime;
    }
  };

  const scrollToCurrentTime = () => {
    const [currentHour, currentMinute] = selectedTime.split(':').map(Number);
    const hourElement = document.getElementById(`hour-${currentHour}`);
    const minuteElement = document.getElementById(`minute-${currentMinute}`);
    
    hourElement?.scrollIntoView({ block: 'center' });
    minuteElement?.scrollIntoView({ block: 'center' });

    // Loop effect for hours
    const hourContainer = hourElement?.parentElement;
    if (hourContainer) {
      const scrollHeight = hourContainer.scrollHeight;
      const clientHeight = hourContainer.clientHeight;
      hourContainer.addEventListener('scroll', function () {
        if (hourContainer.scrollTop + clientHeight >= scrollHeight) {
          hourContainer.scrollTop = 0;
        } else if (hourContainer.scrollTop === 0) {
          hourContainer.scrollTop = scrollHeight - clientHeight;
        }
      });
    }

    // Loop effect for minutes
    const minuteContainer = minuteElement?.parentElement;
    if (minuteContainer) {
      const scrollHeight = minuteContainer.scrollHeight;
      const clientHeight = minuteContainer.clientHeight;
      minuteContainer.addEventListener('scroll', function () {
        if (minuteContainer.scrollTop + clientHeight >= scrollHeight) {
          minuteContainer.scrollTop = 0;
        } else if (minuteContainer.scrollTop === 0) {
          minuteContainer.scrollTop = scrollHeight - clientHeight;
        }
      });
    }
  };

  useEffect(() => {
    initTime();
  }, []);

  useEffect(() => {
    if (showTimepicker) {
      scrollToCurrentTime();
    }
  }, [showTimepicker]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="antialiased sans-serif">
        <div className="container mx-auto px-4 py-2 md:py-10">
          <div className="mb-5 w-64">
            <label className="font-bold mb-1 text-gray-700 block" htmlFor="timepicker">
              Select Time
            </label>
            <div className="relative">
              <input
                type="hidden"
                name="time"
                ref={timeInputRef}
              />
              <input
                type="text"
                readOnly
                value={selectedTime}
                onClick={() => setShowTimepicker(!showTimepicker)}
                onKeyDown={(e) => { if (e.key === 'Escape') setShowTimepicker(false); }}
                className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                placeholder="Select time"
              />
              <div className="absolute top-0 right-0 px-3 py-2">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {showTimepicker && (
                <div className="bg-white mt-12 rounded-lg shadow p-4 pb-1 absolute top-0 left-0" style={{ width: '17rem' }}>
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
                              onClick={() => handleTimeSelect(hour, parseInt(selectedTime.split(':')[1]))}
                              className={`cursor-pointer text-center p-[2px] rounded transition duration-150 ease-in-out ${selectedTime.split(':')[0] === ('0' + hour).slice(-2) ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`}
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
                              onClick={() => handleTimeSelect(parseInt(selectedTime.split(':')[0]), minute)}
                              className={`cursor-pointer text-center p-[2px] rounded transition duration-150 ease-in-out ${selectedTime.split(':')[1] === ('0' + minute).slice(-2) ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`}
                            >
                              {('0' + minute).slice(-2)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className='border-t border-gray-200 w-full text-center py-2'>
                    <button onClick={() => setShowTimepicker(false)} className='text-base text-center'>Submit</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
