import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Step1: React.FC<{ handleNext: () => void; methods: any }> = ({ handleNext, methods }) => {
    const { control, handleSubmit, formState: { errors } } = methods;

  const onSubmit = () => {
    console.log('submit');
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
          )}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors?.name?.message?.toString()}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
          )}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Next
      </button>
    </form>
  );
};

export default Step1;
