import React from 'react';
import { Controller } from 'react-hook-form';
var Step1 = function (_a) {
    var _b, _c, _d;
    var handleNext = _a.handleNext, methods = _a.methods;
    var control = methods.control, handleSubmit = methods.handleSubmit, errors = methods.formState.errors;
    var onSubmit = function () {
        console.log('submit');
        handleNext();
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <Controller name="name" control={control} render={function (_a) {
            var field = _a.field;
            return (<input {...field} type="text" className={"w-full p-2 border rounded-md ".concat(errors.name ? 'border-red-500' : 'border-gray-300')}/>);
        }}/>
        {errors.name && <p className="text-red-500 text-sm">{(_c = (_b = errors === null || errors === void 0 ? void 0 : errors.name) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.toString()}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <Controller name="email" control={control} render={function (_a) {
            var field = _a.field;
            return (<input {...field} type="email" className={"w-full p-2 border rounded-md ".concat(errors.email ? 'border-red-500' : 'border-gray-300')}/>);
        }}/>
        {errors.email && <p className="text-red-500 text-sm">{(_d = errors.email.message) === null || _d === void 0 ? void 0 : _d.toString()}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Next
      </button>
    </form>);
};
export default Step1;
