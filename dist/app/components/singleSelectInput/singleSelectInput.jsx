import React, { forwardRef, useState, useRef, useEffect } from 'react';
var SingleSelectDropdown = forwardRef(function (_a, ref) {
    var options = _a.options, onSelect = _a.onSelect;
    var _b = useState(false), showOptions = _b[0], setShowOptions = _b[1];
    var _c = useState(''), selectedValue = _c[0], setSelectedValue = _c[1];
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
        setSelectedValue(value);
        setShowOptions(false);
        onSelect(value);
    };
    var handleRemove = function () {
        setSelectedValue('');
        onSelect('');
        setShowOptions(false);
    };
    //Function to remove element from selected value
    // const handleRemove = () => {
    //   setSelectedValue('');
    //   onSelect('');
    // };
    return (<div ref={ref} className="relative w-full max-w-md mx-auto">
        <div className="flex items-center w-[350px] px-4 py-1 border border-gray-300 rounded-lg focus-within:border-blue-500">
          {selectedValue ? (<div className=" flex flex-row justify-between items-center w-full  px-2 py-1 mr-2 mb-1 ">
              <span className="text-base  cursor-pointer" onClick={function () { return setShowOptions(function (prev) { return !prev; }); }}>{selectedValue}</span>
              {/* <button
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleRemove}
            >
              &times;
            </button> */}
              <span className="ml-2 text-blue-500  cursor-pointer" onClick={handleRemove}>clear</span>
            </div>) : (<span className="text-gray-500  cursor-pointer w-full" onClick={function () { return setShowOptions(function (prev) { return !prev; }); }}>Select...</span>)}
          
        </div>

        {showOptions && (<ul ref={dropdownRef} className="absolute max-h-[300px] overflow-y-scroll overflow-x-hidden w-[350px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {options.map(function (option, index) { return (<li key={index} className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={function () { return handleSelect(option); }}>
                <span>{option}</span>
                {selectedValue === option && (<span className="text-blue-500 font-semibold">✓</span>)}
              </li>); })}
          </ul>)}
      </div>);
});
SingleSelectDropdown.displayName = 'SingleSelectDropdown';
export default SingleSelectDropdown;
