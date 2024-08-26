'use client';
import { useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var MobileTimePickerModal = function (_a) {
    var hour = _a.hour, minute = _a.minute, ampm = _a.ampm, onChange = _a.onChange, onClose = _a.onClose, onReset = _a.onReset;
    var _b = useState(hour), selectedHour = _b[0], setSelectedHour = _b[1];
    var _c = useState(minute), selectedMinute = _c[0], setSelectedMinute = _c[1];
    var _d = useState(ampm), selectedAmpm = _d[0], setSelectedAmpm = _d[1];
    var adjustHour = function (amount) {
        setSelectedHour(function (prev) {
            var newHour = prev + amount;
            if (newHour > 12)
                return 12;
            if (newHour < 1)
                return 1;
            return newHour;
        });
    };
    var adjustMinute = function (amount) {
        setSelectedMinute(function (prev) {
            var newMinute = prev + amount;
            if (newMinute > 59)
                return 59;
            if (newMinute < 0)
                return 0;
            return newMinute;
        });
    };
    var adjustAmpm = function (direction) {
        setSelectedAmpm(function (prev) {
            if (direction === 'up') {
                return prev === 'AM' ? 'PM' : 'AM';
            }
            else {
                return prev === 'PM' ? 'AM' : 'PM';
            }
        });
    };
    var handleHourChange = function (e) {
        var value = parseInt(e.target.value);
        if (value > 12) {
            setSelectedHour(12);
        }
        else if (value < 1) {
            setSelectedHour(1);
        }
        else {
            setSelectedHour(value);
        }
    };
    var handleMinuteChange = function (e) {
        var value = parseInt(e.target.value);
        if (value > 59) {
            setSelectedMinute(59);
        }
        else if (value < 0) {
            setSelectedMinute(0);
        }
        else {
            setSelectedMinute(value);
        }
    };
    useEffect(function () {
        // Disable scrolling on the background
        document.body.style.overflow = 'hidden';
        return function () {
            // Re-enable scrolling when the modal is closed
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white pt-8 pb-4 px-4 rounded-lg shadow-lg border border-gray-300 flex flex-col justify-center items-center min-h-[372px] min-w-[372px]">
        <MaterialSymbol icon="close" fill size={32} color="gray" className="w-full hover:bg-gray-200  rounded-full text-end mr-10" onClick={onClose}/>
        
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center justify-center mb-6 mt-6 ">
            <div className="flex flex-col items-center">
              <label className="text-base text-gray-600 mb-2">Hour</label>
              <div className="flex flex-col items-center justify-center">
                <button onClick={function () { return adjustHour(1); }} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-[-90deg]"/>
                </button>

                <input type="number" value={selectedHour} onChange={handleHourChange} className="border border-gray-300 rounded-md p-3 w-20 text-center text-lg" min="1" max="12"/>
                <button onClick={function () { return adjustHour(-1); }} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-90"/>
                </button>
              </div>
            </div>
            <span className="text-xl mx-4">:</span>
            <div className="flex flex-col items-center">
              <label className="text-base text-gray-600 mb-2">Minute</label>
              <div className="flex flex-col items-center">
                <button onClick={function () { return adjustMinute(1); }} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-[-90deg]"/>
                </button>
                <input type="number" value={selectedMinute} onChange={handleMinuteChange} className="border border-gray-300 rounded-md p-3 w-20 text-center text-lg" min="0" max="59"/>
                <button onClick={function () { return adjustMinute(-1); }} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-90"/>
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center ml-6">
              <label className="text-base text-gray-600 mb-2">AM/PM</label>
              <div className="flex flex-col items-center justify-center">
                <button onClick={function () { return adjustAmpm('up'); }} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-[-90deg]"/>
                </button>
                <input type="text" value={selectedAmpm} readOnly className="border border-gray-300 rounded-md p-3 w-20 text-center text-lg"/>
                <button onClick={function () { return adjustAmpm('down'); }} className="text-gray-500">
                  <MaterialSymbol icon="chevron_right" size={34} className="rotate-90"/>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-40 mt-4 w-full">
            <button onClick={function () { return onChange(selectedHour, selectedMinute, selectedAmpm); }} className="text-blue-500 rounded-lg text-lg hover:scale-105 hover:text-blue-600 transition ease-in-out duration-100">
              Confirm
            </button>
            <button onClick={onReset} className="text-black text-lg hover:scale-105 hover:text-red-500 transition ease-in-out duration-100">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>);
};
export default MobileTimePickerModal;
