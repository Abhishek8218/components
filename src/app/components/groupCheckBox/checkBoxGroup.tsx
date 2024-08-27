// components/CheckboxGroup.tsx
import React, { useState, ChangeEvent } from 'react';

interface SubOption {
  label: string;
  value: string;
}

interface Option {
  label: string;
  value: string;
  subOptions?: SubOption[];
}

interface CheckboxGroupProps {
  options: Option[];
  maxSelection?: number;
  onChange?: (selectedValues: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, maxSelection, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Check for invalid input
    if (!options.flatMap(option => [option.value, ...(option.subOptions || []).map(sub => sub.value)]).includes(value)) {
      setError('Invalid option selected.');
      return;
    }

    setError(null); // Clear any previous errors

    if (selectedValues.includes(value)) {
      const updatedValues = selectedValues.filter((item) => item !== value);
      setSelectedValues(updatedValues);
      onChange?.(updatedValues);
    } else if (!maxSelection || selectedValues.length < maxSelection) {
      const updatedValues = [...selectedValues, value];
      setSelectedValues(updatedValues);
      onChange?.(updatedValues);
    } else {
      setError(`You can only select up to ${maxSelection} options.`);
    }
  };

  const handleParentClick = (value: string) => {
    setExpandedOptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  // Validate options prop
  if (!Array.isArray(options) || options.length === 0) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <p className="text-red-600">Error: Invalid options provided.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <div key={index} className="space-y-2">
            {option.subOptions ? (
              // Render as a menu button
              <div>
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => handleParentClick(option.value)}
                >
                  <div
                    className={`flex items-center justify-center h-5 w-5 rounded-sm border border-gray-500 text-gray-700 font-bold text-xl ${
                      expandedOptions.has(option.value) ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    {expandedOptions.has(option.value) ? '-' : '+'}
                  </div>
                  <span className="text-gray-700 font-semibold">{option.label}</span>
                </div>
                {expandedOptions.has(option.value) && (
                  <div className="ml-6 space-y-2">
                    {option.subOptions.map((subOption, subIndex) => (
                      <label key={subIndex} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          value={subOption.value}
                          checked={selectedValues.includes(subOption.value)}
                          onChange={handleCheckboxChange}
                          className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring focus:ring-green-300"
                        />
                        <span className="text-gray-700">{subOption.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Render as a checkbox item
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring focus:ring-green-300"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            )}
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
