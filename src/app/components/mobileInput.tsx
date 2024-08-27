import React, { forwardRef, Ref, ChangeEvent, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MobileInput = forwardRef(
  ({ onChange, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;

      // Clean up the input value
      newValue = newValue.replace(/^\+\d{1,2}/, ''); // Remove any country code
      newValue = newValue.replace(/\D+/g, '').trim(); // Remove all non-numeric characters

      // Ensure the value length is limited to 10 characters
      if (newValue.length > 10) {
        newValue = newValue.slice(-10);
      }

      setValue(newValue); // Update the internal state with the cleaned value

      // Create a synthetic event to pass the cleaned value to the parent component
      const syntheticEvent = {
        ...event,
        target: { ...event.target, value: newValue },
      };

      if (onChange) {
        onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      // Prevent the default paste behavior
      event.preventDefault();

      // Get the pasted text and clean it up
      const pastedText = (event.clipboardData || (window as any).Clipboard).getData('text');
      let cleanedText = pastedText.replace(/\D+/g, '').trim();

      // Ensure the cleaned text does not exceed 10 characters
      if (cleanedText.length > 10) {
        cleanedText = cleanedText.slice(-10);
      }

      setValue(cleanedText); // Update the state with the cleaned text

      // Create a synthetic event to pass the cleaned value to the parent component
      const syntheticEvent = {
        ...event,
        target: { ...event.target, value: cleanedText },
      };

      // if (onChange) {
      //   onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
      // }
    };

    return (
      <input
        type="tel"
        ref={ref}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        {...props}
        className="p-2 border rounded" // Example Tailwind CSS styles
      />
    );
  }
);

MobileInput.displayName = 'MobileInput';

export default MobileInput;
