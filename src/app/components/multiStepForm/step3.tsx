import React from 'react';

const Step3: React.FC<{ handleBack: () => void; getValues: () => any }> = ({ handleBack, getValues }) => {
  const formData = getValues();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Review Your Information</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Address:</strong> {formData.address}</p>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step3;
