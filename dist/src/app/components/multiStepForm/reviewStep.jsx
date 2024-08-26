// src/components/ReviewStep.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
var ReviewStep = function () {
    var watch = useForm().watch;
    var formData = watch();
    return (<div className="space-y-4">
      <h2 className="text-lg font-semibold">Review Your Information</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Address:</strong> {formData.address}</p>
      </div>
    </div>);
};
export default ReviewStep;
