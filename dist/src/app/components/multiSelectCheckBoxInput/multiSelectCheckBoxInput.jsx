var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { forwardRef, useState, useRef, useEffect } from 'react';
var MultiSelectDropdown = forwardRef(function (_a, ref) {
    var options = _a.options, onSelect = _a.onSelect;
    var _b = useState(false), showOptions = _b[0], setShowOptions = _b[1];
    var _c = useState([]), selectedValues = _c[0], setSelectedValues = _c[1];
    var dropdownRef = useRef(null);
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var handleSelect = function (value) {
        var newValues = [];
        if (selectedValues.includes(value)) {
            newValues = selectedValues.filter(function (v) { return v !== value; });
        }
        else {
            newValues = __spreadArray(__spreadArray([], selectedValues, true), [value], false);
        }
        setSelectedValues(newValues);
        onSelect(newValues);
    };
    var handleRemove = function (value) {
        var newValues = selectedValues.filter(function (v) { return v !== value; });
        setSelectedValues(newValues);
        onSelect(newValues);
    };
    return (<div ref={ref} className="relative w-full max-w-md mx-auto">
        <div onClick={function () { return setShowOptions(function (prev) { return !prev; }); }} className="flex flex-wrap items-center w-[350px] px-4 py-2 border border-gray-300 rounded-lg focus-within:border-blue-500 cursor-pointer">
          {selectedValues.length > 0 ? (selectedValues.map(function (value, index) { return (<div key={index} className="flex items-center px-2 py-1 mr-2 mb-1 bg-gray-200 rounded-full">
                <span className="text-sm">{value}</span>
                <button className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={function () { return handleRemove(value); }}>
                  &times;
                </button>
              </div>); })) : (<span className="text-gray-500">Select...</span>)}

          {selectedValues.length > 0 ? (<div><button className="ml-2 text-blue-500 hover:text-red-400 focus:outline-none" onClick={function () { return setSelectedValues([]); }}>clear all</button></div>) : ("")}
          
        </div>

        {showOptions && (<ul ref={dropdownRef} className="absolute max-h-[300px] overflow-y-scroll overflow-x-hidden w-[350px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {options.map(function (option, index) { return (<li key={index} className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={function () { return handleSelect(option); }}>
                <span>{option}</span>
                {selectedValues.includes(option) && (<span className="text-blue-500 font-semibold">✓</span>)}
              </li>); })}
          </ul>)}
      </div>);
});
MultiSelectDropdown.displayName = 'MultiSelectDropdown';
export default MultiSelectDropdown;
