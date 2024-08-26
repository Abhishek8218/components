// components/DynamicForm.tsx

import React from 'react';

interface DynamicFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  columns?: number; // Number of columns per row
  columnWidth?: string; // Width of each column in Tailwind class format (e.g., "col-span-2")
  singleColumn?: boolean; // Option to display in a single column
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  children,
  className = '',
  onSubmit,
  columns = 2, // Default to 2 columns
  columnWidth = 'col-span-1', // Default column width
  singleColumn = false
}) => {
  return (
    <form
      className={`grid p-4 bg-white rounded-lg shadow-md `}
      onSubmit={onSubmit}
    >
      {React.Children.map(children, (child) =>
        child && React.isValidElement(child) && React.cloneElement(child, { className: `${columnWidth} ${child.props.className || ''}` } as React.HTMLAttributes<HTMLElement>)
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
