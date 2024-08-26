var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useEffect, useState } from 'react';
var ITEM_HEIGHT = 40;
var TimePickerModal = function (_a) {
    var selectedTime = _a.selectedTime, hours = _a.hours, minutes = _a.minutes, onSelect = _a.onSelect, onClose = _a.onClose;
    var _b = useState(parseInt(selectedTime.split(':')[0])), selectedHour = _b[0], setSelectedHour = _b[1];
    var _c = useState(parseInt(selectedTime.split(':')[1])), selectedMinute = _c[0], setSelectedMinute = _c[1];
    var hourRef = useRef(null);
    var minuteRef = useRef(null);
    var duplicateItems = function (arr) { return __spreadArray(__spreadArray(__spreadArray([], arr, true), arr, true), arr, true); }; // Tripling the array
    var extendedHours = duplicateItems(hours);
    var extendedMinutes = duplicateItems(minutes);
    var middleHourIndex = extendedHours.length / 3;
    var middleMinuteIndex = extendedMinutes.length / 3;
    var scrollToSelected = function () {
        if (hourRef.current && minuteRef.current) {
            var initialHourScroll = middleHourIndex * ITEM_HEIGHT + hours.indexOf(selectedHour) * ITEM_HEIGHT;
            var initialMinuteScroll = middleMinuteIndex * ITEM_HEIGHT + minutes.indexOf(selectedMinute) * ITEM_HEIGHT;
            hourRef.current.scrollTop = initialHourScroll;
            minuteRef.current.scrollTop = initialMinuteScroll;
        }
    };
    useEffect(function () {
        scrollToSelected();
    }, []);
    var handleHourScroll = function () {
        if (hourRef.current) {
            var scrollPosition = hourRef.current.scrollTop;
            var index = Math.round(scrollPosition / ITEM_HEIGHT);
            var actualIndex = index % hours.length;
            if (scrollPosition < ITEM_HEIGHT * 0.5) {
                hourRef.current.scrollTop = (middleHourIndex + actualIndex) * ITEM_HEIGHT;
            }
            else if (scrollPosition > hourRef.current.scrollHeight - hourRef.current.clientHeight - ITEM_HEIGHT * 0.5) {
                hourRef.current.scrollTop = (middleHourIndex + actualIndex) * ITEM_HEIGHT;
            }
            setSelectedHour(hours[actualIndex]);
        }
    };
    var handleMinuteScroll = function () {
        if (minuteRef.current) {
            var scrollPosition = minuteRef.current.scrollTop;
            var index = Math.round(scrollPosition / ITEM_HEIGHT);
            var actualIndex = index % minutes.length;
            if (scrollPosition < ITEM_HEIGHT * 0.5) {
                minuteRef.current.scrollTop = (middleMinuteIndex + actualIndex) * ITEM_HEIGHT;
            }
            else if (scrollPosition > minuteRef.current.scrollHeight - minuteRef.current.clientHeight - ITEM_HEIGHT * 0.5) {
                minuteRef.current.scrollTop = (middleMinuteIndex + actualIndex) * ITEM_HEIGHT;
            }
            setSelectedMinute(minutes[actualIndex]);
        }
    };
    var handleSubmit = function () {
        onSelect(selectedHour, selectedMinute);
        onClose();
    };
    return (<div className=" inset-0  bg-opacity-60 flex justify-center items-center z-50">
    <div className=" bg-white rounded-lg shadow p-4 pb-1 min-w-[270px]  ml-4 mt-1">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Select Time</h3>
          <div className="flex space-x-4 w-full">
            <div className="w-1/2">
              <h4 className="text-center font-medium">Hours</h4>
              <div className="overflow-y-auto h-48 no-scrollbar" ref={hourRef} onScroll={handleHourScroll} style={{ scrollBehavior: 'smooth' }}>
                <div className="flex flex-col items-center pt-[60%]">
                  {extendedHours.map(function (hour, index) { return (<div key={index} className={"cursor-pointer text-center text-sm py-2 transition duration-150 ease-in-out ".concat(selectedHour === hour ? 'text-blue-500 text-lg font-bold' : 'text-gray-700 text-lg')} style={{ height: ITEM_HEIGHT }}>
                      {('0' + hour).slice(-2)}
                    </div>); })}
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h4 className="text-center font-medium">Minutes</h4>
              <div className="overflow-y-auto h-48 no-scrollbar" ref={minuteRef} onScroll={handleMinuteScroll} style={{ scrollBehavior: 'smooth' }}>
                <div className="flex flex-col items-center pt-[60%] no-scrollbar">
                  {extendedMinutes.map(function (minute, index) { return (<div key={index} className={"cursor-pointer text-center  text-sm py-2 transition duration-150 ease-in-out ".concat(selectedMinute === minute ? 'text-blue-500 text-lg font-bold' : 'text-gray-700 text-lg')} style={{ height: ITEM_HEIGHT }}>
                      {('0' + minute).slice(-2)}
                    </div>); })}
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
    </div>);
};
export default TimePickerModal;
