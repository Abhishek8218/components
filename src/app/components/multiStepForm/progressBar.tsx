// src/components/ProgressBar.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative w-full mb-10">
      <div className="flex justify-between">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`w-1/4 text-center text-sm font-medium mt-20 ${
              index < currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            {`Step ${index + 1}`}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gray-200 rounded-full h-2 mb-20">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
