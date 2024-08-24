import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Step2: React.FC<{ handleNext: () => void; handleBack: () => void }> = ({ handleNext, handleBack }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Address</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
          )}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message?.toString()}</p>}
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
