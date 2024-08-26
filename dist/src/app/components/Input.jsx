var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
// Define the Input component
var Input = forwardRef(function (_a, ref) {
    var _b = _a.type, type = _b === void 0 ? 'text' : _b, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange, className = _a.className, props = __rest(_a, ["type", "placeholder", "value", "onChange", "className"]);
    return (<input type={type} placeholder={placeholder} value={value} onChange={onChange} className={"w-[450px] mb-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 ".concat(className)} // Apply Tailwind CSS classes here
     ref={ref} // Forward the ref to the input element
     {...props} // Spread any additional props
    />);
});
Input.displayName = 'Input'; // Set a display name for debugging
export default Input;
