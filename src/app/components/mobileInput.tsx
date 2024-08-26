import React, { forwardRef, Ref, ChangeEvent, useRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MobileInput = forwardRef(
  ({ onChange, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      // Remove any country code (e.g., +91) by removing any non-digit characters

        //   // Check if the value starts with + followed by 1 or 2 digits
          if (event.target.value.startsWith('+')) {
            value = event.target.value.replace(/^\+\d{1,2}/, '');
          }

if(value.length > 10){
    
        value = value.slice(-10);
}

      // Remove all non-numeric characters and additional spaces
      value = value.replace(/\D+/g, '').trim();

      // Create a synthetic event to pass the cleaned value to the parent component
      const syntheticEvent = {
        ...event,
        target: { ...event.target, value },
      };

      if (onChange) {
        onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
      }
    };



    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow only numeric input, Backspace, Delete, Arrow keys, and Tab
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
          event.preventDefault();
        }
      };

    return (
      <input
        type="tel"
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
        className="p-2 border rounded" // Example Tailwind CSS styles
      />
    );
  }
);

MobileInput.displayName = 'Input';

export default MobileInput;

