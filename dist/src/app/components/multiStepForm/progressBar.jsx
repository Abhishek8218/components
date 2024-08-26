var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// src/components/ProgressBar.tsx
import React from 'react';
var ProgressBar = function (_a) {
    var currentStep = _a.currentStep, totalSteps = _a.totalSteps;
    var percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return (<div className="relative w-full mb-10">
      <div className="flex justify-between">
        {__spreadArray([], Array(totalSteps), true).map(function (_, index) { return (<div key={index} className={"w-1/4 text-center text-sm font-medium mt-20 ".concat(index < currentStep ? 'text-blue-600' : 'text-gray-400')}>
            {"Step ".concat(index + 1)}
          </div>); })}
      </div>
      <div className="absolute inset-0 bg-gray-200 rounded-full h-2 mb-20">
        <div style={{ width: "".concat(percentage, "%") }} className="bg-blue-600 h-full rounded-full transition-all duration-300"></div>
      </div>
    </div>);
};
export default ProgressBar;
