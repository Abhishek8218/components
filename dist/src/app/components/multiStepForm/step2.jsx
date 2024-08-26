import React from 'react';
import { Controller, useForm } from 'react-hook-form';
var Step2 = function (_a) {
    var _b;
    var handleNext = _a.handleNext, handleBack = _a.handleBack;
    var _c = useForm(), control = _c.control, handleSubmit = _c.handleSubmit, errors = _c.formState.errors;
    var onSubmit = function () {
        handleNext();
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Address</label>
        <Controller name="address" control={control} render={function (_a) {
            var field = _a.field;
            return (<input {...field} type="text" className={"w-full p-2 border rounded-md ".concat(errors.address ? 'border-red-500' : 'border-gray-300')}/>);
        }}/>
        {errors.address && <p className="text-red-500 text-sm">{(_b = errors.address.message) === null || _b === void 0 ? void 0 : _b.toString()}</p>}
      </div>
      <div className="flex space-x-4">
        <button type="button" onClick={handleBack} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
          Back
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Next
        </button>
      </div>
    </form>);
};
export default Step2;
