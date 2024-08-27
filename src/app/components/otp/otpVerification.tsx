'use client'



import React, { useEffect, useState, useRef, forwardRef } from 'react';

// Local Storage Hook
function useLocalStorage<T>(key: string, initialValue: T, parseValue: (v: string | null) => T) {
  const [item, setValue] = useState<T>(initialValue);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const value = parseValue(localStorage.getItem(key));
      setValue(value || initialValue);
    }
  }, [key, initialValue, parseValue]);

  const setItem = (newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [item, setItem] as const;
}

// OTPInput Component
const OTPInput = forwardRef<HTMLInputElement, {}>((props, ref) => {
  const [otp, setOTP] = useState<string>("");

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 6); // Limit to 6 digits

    if (/[^0-9]/.test(value)) {
      throw new Error('Invalid input. Please enter only numbers.');
    }

    setOTP(numericValue);
    e.target.value = numericValue; // Update the input field value
  };

  return (
    <input
      type="text"
      ref={ref}
      maxLength={6}
      pattern="\d{6}"
      placeholder="_ _ _ _ _ _"
      value={otp}
      onChange={handleOTPChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
    />
  );
});

OTPInput.displayName = 'OTPInput';

// Utility function to format time
function formatTime(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// OTPVerification Component
const OTPVerification: React.FC = () => {
  const initialTime = 30 * 1000; // 30 seconds in milliseconds
  const [startTime, setStartTime] = useLocalStorage<number | null>(
    'otp:countdown:startTime',
    null,
    (v) => Number(v),
  );
  const [lapse, setLapse] = useLocalStorage<number>(
    'otp:countdown:time',
    initialTime,
    (v) => Number(v),
  );
  const [running, setRunning] = useLocalStorage<boolean>(
    'otp:countdown:running',
    false,
    (v) => v === 'true',
  );
  const timerRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (running) {
      const start = startTime || Date.now();
      setStartTime(start);
      timerRef.current = window.setInterval(() => {
        const timePassed = Date.now() - start;
        const remainingTime = initialTime - timePassed;
        if (remainingTime <= 0) {
          setLapse(0); // Show "Resend" button when time is up
          setRunning(false); // Stop the timer
        } else {
          setLapse(Math.ceil(remainingTime / 1000) * 1000); // Round up to the nearest second
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running, startTime, setStartTime, setLapse]);

  useEffect(() => {
    if (!running && lapse > 0) {
      setRunning(true);
    }
  }, [lapse, running, setRunning]);

  const resendOTP = () => {
    setLapse(initialTime);
    setStartTime(Date.now());
    setRunning(true);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = () => {
    const otp = inputRef.current?.value;
    if (otp) {
      // Handle OTP submission logic here
      console.log('Submitted OTP:', otp);
    } else {
      console.log('Please enter an OTP');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4 text-center text-xl font-semibold">Enter your OTP</div>
      <OTPInput ref={inputRef} />
      <div className="mt-4 text-center">
        {lapse > 0 ? (
          <span className="text-gray-700">
            Resend OTP in {formatTime(lapse)}
          </span>
        ) : (
          <p
            onClick={resendOTP}
            className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
          >
            Resend OTP
          </p>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
