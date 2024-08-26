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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useQueryClient, useMutation } from '@tanstack/react-query';
var schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(20, 'Password must not exceed 20 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
}).required();
var ReactForm = function () {
    var _a, _b, _c, _d, _e;
    var _f = useForm({
        resolver: yupResolver(schema)
    }), register = _f.register, handleSubmit = _f.handleSubmit, errors = _f.formState.errors;
    var queryClient = useQueryClient();
    var saveToLocalStorage = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var existingData, updatedData;
        return __generator(this, function (_a) {
            existingData = JSON.parse(localStorage.getItem('formData') || '[]');
            updatedData = __spreadArray(__spreadArray([], existingData, true), [data], false);
            localStorage.setItem('formData', JSON.stringify(updatedData));
            return [2 /*return*/, data];
        });
    }); };
    var _g = useMutation({ mutationFn: saveToLocalStorage, onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ["formData"] });
        } }), updateForm = _g.mutate, isError = _g.isError, isPending = _g.isPending, isSuccess = _g.isSuccess;
    var onSubmit = function (formData) {
        return updateForm(formData);
    };
    if (isPending)
        return <div>Loading...</div>;
    if (isError)
        return <div>Error: saving data</div>;
    return (<div className=" flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input id="firstName" {...register('firstName')} type="text" placeholder="First Name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
              <p className="text-red-500 text-xs italic">{(_a = errors.firstName) === null || _a === void 0 ? void 0 : _a.message}</p>
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input id="lastName" {...register('lastName')} type="text" placeholder="Last Name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
              <p className="text-red-500 text-xs italic">{(_b = errors.lastName) === null || _b === void 0 ? void 0 : _b.message}</p>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" {...register('email')} type="email" placeholder="Email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
              <p className="text-red-500 text-xs italic">{(_c = errors.email) === null || _c === void 0 ? void 0 : _c.message}</p>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" {...register('password')} type="password" placeholder="Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
              <p className="text-red-500 text-xs italic">{(_d = errors.password) === null || _d === void 0 ? void 0 : _d.message}</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input id="confirmPassword" {...register('confirmPassword')} type="password" placeholder="Confirm Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
              <p className="text-red-500 text-xs italic">{(_e = errors.confirmPassword) === null || _e === void 0 ? void 0 : _e.message}</p>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
       
          </div>
        </form>
      </div>
    </div>);
};
export default ReactForm;
