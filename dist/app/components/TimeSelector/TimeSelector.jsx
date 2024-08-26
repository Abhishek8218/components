// components/TimePicker.tsx
'use client';
import { useEffect, useState } from 'react';
import TimeselectorModal from './Desktop/timeSelector';
import MobileTimePickerModal from './mobile/mobileTimeSelector';
var TimeSelector = function (_a) {
    var onChange = _a.onChange;
    var _b = useState(12), hour = _b[0], setHour = _b[1];
    var _c = useState(0), minute = _c[0], setMinute = _c[1];
    var _d = useState('AM'), ampm = _d[0], setAmpm = _d[1];
    var _e = useState(false), isModalOpen = _e[0], setModalOpen = _e[1];
    var handleTimeChange = function (hour, minute, ampm) {
        setHour(hour);
        setMinute(minute);
        setAmpm(ampm);
        var time = "".concat(hour.toString().padStart(2, '0'), ":").concat(minute.toString().padStart(2, '0'), " ").concat(ampm);
        onChange(time);
        setModalOpen(false);
    };
    var handleReset = function () {
        setHour(12);
        setMinute(0);
        setAmpm('AM');
        setModalOpen(false);
    };
    // Check if the user is using a mobile device
    var useUserAgent = function () {
        var _a = useState(''), userAgent = _a[0], setUserAgent = _a[1];
        useEffect(function () {
            setUserAgent(navigator.userAgent);
        }, []);
        return userAgent;
    };
    var userAgent = useUserAgent();
    var isMobile = /Mobi|Android|iPad|iPhone|iPod/i.test(userAgent);
    return (<div className='relative'>
      <button onClick={function () { return setModalOpen(true); }} className="  flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <span>{hour.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{minute.toString().padStart(2, '0')}</span>
        <span>{ampm}</span>
      </button>

      {isModalOpen && (isMobile ? <MobileTimePickerModal hour={hour} minute={minute} ampm={ampm} onChange={handleTimeChange} onClose={function () { return setModalOpen(false); }} onReset={handleReset}/> : (<TimeselectorModal hour={hour} minute={minute} ampm={ampm} onChange={handleTimeChange} onClose={function () { return setModalOpen(false); }} onReset={handleReset}/>))}
    
    </div>);
};
export default TimeSelector;
