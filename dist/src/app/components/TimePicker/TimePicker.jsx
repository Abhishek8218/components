// TimePicker.tsx
import React, { useState, useRef, useEffect } from "react";
import TimePickerModal from "./DesktopTimePicker";
import MobileTimePickerModal from "./MobileTimePicker";
var TimePicker = function () {
    var _a = useState(false), showTimepicker = _a[0], setShowTimepicker = _a[1];
    var _b = useState(""), selectedTime = _b[0], setSelectedTime = _b[1];
    var _c = useState(Array.from({ length: 24 }, function (_, i) { return i; })), hours = _c[0], setHours = _c[1];
    var _d = useState(Array.from({ length: 60 }, function (_, i) { return i; })), minutes = _d[0], setMinutes = _d[1];
    var timeInputRef = useRef(null);
    var initTime = function () {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var formattedTime = "".concat(("0" + hour).slice(-2), ":").concat(("0" + minute).slice(-2));
        setSelectedTime(formattedTime);
        if (timeInputRef.current) {
            timeInputRef.current.value = formattedTime;
        }
    };
    var handleTimeSelect = function (hour, minute) {
        var formattedTime = "".concat(("0" + hour).slice(-2), ":").concat(("0" + minute).slice(-2));
        setSelectedTime(formattedTime);
        if (timeInputRef.current) {
            timeInputRef.current.value = formattedTime;
        }
        setShowTimepicker(false);
    };
    useEffect(function () {
        initTime();
    }, []);
    useEffect(function () {
        if (isMobile && showTimepicker) {
            document.body.classList.add('no-scroll');
        }
        else {
            document.body.classList.remove('no-scroll');
        }
    }, [showTimepicker]);
    // Function to check if the device is mobile
    var useUserAgent = function () {
        var _a = useState(""), userAgent = _a[0], setUserAgent = _a[1];
        useEffect(function () {
            setUserAgent(navigator.userAgent);
        }, []);
        return userAgent;
    };
    var userAgent = useUserAgent();
    var isMobile = /Mobi|Android/i.test(userAgent);
    return (<div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="antialiased sans-serif">
        <div className="container mx-auto px-4 py-2 md:py-10">
          <div className="mb-5 w-64">
            <label className="font-bold mb-1 text-gray-700 block" htmlFor="timepicker">
              Select Time
            </label>
            <div className="relative">
              <input type="hidden" name="time" ref={timeInputRef}/>
              <input type="text" readOnly value={selectedTime} onClick={function () { return setShowTimepicker(!showTimepicker); }} onKeyDown={function (e) {
            if (e.key === "Escape")
                setShowTimepicker(false);
        }} className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" placeholder="Select time"/>
              <div className="absolute top-0 right-0 px-3 py-2">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>

              {showTimepicker &&
            (isMobile ? (<MobileTimePickerModal selectedTime={selectedTime} hours={hours} minutes={minutes} onSelect={handleTimeSelect} onClose={function () { return setShowTimepicker(false); }}/>) : (<TimePickerModal selectedTime={selectedTime} hours={hours} minutes={minutes} onSelect={handleTimeSelect} onClose={function () { return setShowTimepicker(false); }}/>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default TimePicker;
