// TimePicker.tsx
import React, { useState, useRef, useEffect } from "react";
import TimePickerModal from "./DesktopTimePicker";
import MobileTimePickerModal from "./MobileTimePicker";

const TimePicker = () => {
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [hours, setHours] = useState<number[]>(
    Array.from({ length: 24 }, (_, i) => i)
  );
  const [minutes, setMinutes] = useState<number[]>(
    Array.from({ length: 60 }, (_, i) => i)
  );
  const timeInputRef = useRef<HTMLInputElement>(null);

  const initTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const formattedTime = `${("0" + hour).slice(-2)}:${("0" + minute).slice(
      -2
    )}`;
    setSelectedTime(formattedTime);
    if (timeInputRef.current) {
      timeInputRef.current.value = formattedTime;
    }
  };

  const handleTimeSelect = (hour: number, minute: number) => {
    const formattedTime = `${("0" + hour).slice(-2)}:${("0" + minute).slice(
      -2
    )}`;
    setSelectedTime(formattedTime);
    if (timeInputRef.current) {
      timeInputRef.current.value = formattedTime;
    }
    setShowTimepicker(false);
  };

  useEffect(() => {
    initTime();
  }, []);




  useEffect(() => {
    if (isMobile && showTimepicker) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [showTimepicker]);
  




// Function to check if the device is mobile
  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();

  const isMobile = /Mobi|Android/i.test(userAgent);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="antialiased sans-serif">
        <div className="container mx-auto px-4 py-2 md:py-10">
          <div className="mb-5 w-64">
            <label
              className="font-bold mb-1 text-gray-700 block"
              htmlFor="timepicker"
            >
              Select Time
            </label>
            <div className="relative">
              <input type="hidden" name="time" ref={timeInputRef} />
              <input
                type="text"
                readOnly
                value={selectedTime}
                onClick={() => setShowTimepicker(!showTimepicker)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowTimepicker(false);
                }}
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

              {showTimepicker &&
                (isMobile ? (
                  <MobileTimePickerModal
                    selectedTime={selectedTime}
                    hours={hours}
                    minutes={minutes}
                    onSelect={handleTimeSelect}
                    onClose={() => setShowTimepicker(false)}
                  />
                ) : (
                  <TimePickerModal
                    selectedTime={selectedTime}
                    hours={hours}
                    minutes={minutes}
                    onSelect={handleTimeSelect}
                    onClose={() => setShowTimepicker(false)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
