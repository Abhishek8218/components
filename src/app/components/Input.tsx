import React, { forwardRef } from 'react';



interface InputProps{
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  }

// Define the Input component
const Input = forwardRef(({ type = 'text', placeholder, value, onChange, className, ...props }:InputProps, ref:any) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      className={`w-[450px] mb-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 ${className}`} // Apply Tailwind CSS classes here
      ref={ref} // Forward the ref to the input element
      {...props} // Spread any additional props
    />
  );
});

Input.displayName = 'Input'; // Set a display name for debugging

export default Input;
