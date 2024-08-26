'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataSchema } from './schema';
var steps = [
    {
        id: 'Step 1',
        name: 'Personal Information',
        fields: ['firstName', 'lastName', 'email']
    },
    {
        id: 'Step 2',
        name: 'Address',
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    { id: 'Step 3', name: 'Complete' }
];
export default function Form() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = useState(0), previousStep = _j[0], setPreviousStep = _j[1];
    var _k = useState(0), currentStep = _k[0], setCurrentStep = _k[1];
    var delta = currentStep - previousStep;
    var _l = useForm({
        resolver: yupResolver(FormDataSchema)
    }), control = _l.control, handleSubmit = _l.handleSubmit, watch = _l.watch, reset = _l.reset, trigger = _l.trigger, errors = _l.formState.errors;
    var processForm = function (data) {
        console.log(data);
        reset();
    };
    var next = function () { return __awaiter(_this, void 0, void 0, function () {
        var fields, output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = steps[currentStep].fields;
                    return [4 /*yield*/, trigger(fields, { shouldFocus: true })];
                case 1:
                    output = _a.sent();
                    if (!output)
                        return [2 /*return*/];
                    if (!(currentStep < steps.length - 1)) return [3 /*break*/, 4];
                    if (!(currentStep === steps.length - 2)) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleSubmit(processForm)()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    setPreviousStep(currentStep);
                    setCurrentStep(function (step) { return step + 1; });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var prev = function () {
        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep(function (step) { return step - 1; });
        }
    };
    return (<section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map(function (step, index) { return (<li key={step.name} className='md:flex-1'>
              {currentStep > index ? (<div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>) : currentStep === index ? (<div className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:border-t-4 md:pl-0 md:pt-4' aria-current='step'>
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>) : (<div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>)}
            </li>); })}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (<div>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Personal Information
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Provide your personal details.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor='firstName' className='block text-sm font-medium leading-6 text-gray-900'>
                  First name
                </label>
                <div className='mt-2'>
                  <Controller name='firstName' control={control} render={function (_a) {
                var field = _a.field;
                return (<input type='text' id='firstName' {...field} autoComplete='given-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_a = errors.firstName) === null || _a === void 0 ? void 0 : _a.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.firstName.message}
                    </p>)}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='lastName' className='block text-sm font-medium leading-6 text-gray-900'>
                  Last name
                </label>
                <div className='mt-2'>
                  <Controller name='lastName' control={control} render={function (_a) {
                var field = _a.field;
                return (<input type='text' id='lastName' {...field} autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_b = errors.lastName) === null || _b === void 0 ? void 0 : _b.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.lastName.message}
                    </p>)}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Email address
                </label>
                <div className='mt-2'>
                  <Controller name='email' control={control} render={function (_a) {
                var field = _a.field;
                return (<input id='email' type='email' {...field} autoComplete='email' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_c = errors.email) === null || _c === void 0 ? void 0 : _c.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>)}
                </div>
              </div>
            </div>
          </div>)}

        {currentStep === 1 && (<div>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Address
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label htmlFor='country' className='block text-sm font-medium leading-6 text-gray-900'>
                  Country
                </label>
                <div className='mt-2'>
                  <Controller name='country' control={control} render={function (_a) {
                var field = _a.field;
                return (<input id='country' type='text' {...field} autoComplete='country' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_d = errors.country) === null || _d === void 0 ? void 0 : _d.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.country.message}
                    </p>)}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label htmlFor='street' className='block text-sm font-medium leading-6 text-gray-900'>
                  Street address
                </label>
                <div className='mt-2'>
                  <Controller name='street' control={control} render={function (_a) {
                var field = _a.field;
                return (<input id='street' type='text' {...field} autoComplete='street-address' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_e = errors.street) === null || _e === void 0 ? void 0 : _e.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.street.message}
                    </p>)}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900'>
                  City
                </label>
                <div className='mt-2'>
                  <Controller name='city' control={control} render={function (_a) {
                var field = _a.field;
                return (<input id='city' type='text' {...field} autoComplete='address-level2' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_f = errors.city) === null || _f === void 0 ? void 0 : _f.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.city.message}
                    </p>)}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='state' className='block text-sm font-medium leading-6 text-gray-900'>
                  State
                </label>
                <div className='mt-2'>
                  <Controller name='state' control={control} render={function (_a) {
                var field = _a.field;
                return (<input id='state' type='text' {...field} autoComplete='address-level1' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_g = errors.state) === null || _g === void 0 ? void 0 : _g.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.state.message}
                    </p>)}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='zip' className='block text-sm font-medium leading-6 text-gray-900'>
                  ZIP code
                </label>
                <div className='mt-2'>
                  <Controller name='zip' control={control} render={function (_a) {
                var field = _a.field;
                return (<input id='zip' type='text' {...field} autoComplete='postal-code' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'/>);
            }}/>
                  {((_h = errors.zip) === null || _h === void 0 ? void 0 : _h.message) && (<p className='mt-2 text-sm text-red-400'>
                      {errors.zip.message}
                    </p>)}
                </div>
              </div>
            </div>
          </div>)}

        {currentStep === 2 && (<div className='flex justify-center'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Form Completed
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              You have completed the form.
            </p>
          </div>)}

        <div className='mt-8 flex items-center justify-between'>
          {currentStep > 0 && (<button type='button' onClick={prev} className='inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-300 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
              Back
            </button>)}
          {currentStep < steps.length - 1 ? (<button type='button' onClick={next} className='inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-1.5 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
              Next
            </button>) : (<button type='submit' className='inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-1.5 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
              Submit
            </button>)}
        </div>
      </form>
    </section>);
}
