// components/FormInput.tsx

import React from 'react';

interface FormInputProps {
  id: string;
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string; // Allow additional class names
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-gray-700 mb-2">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormInput;
