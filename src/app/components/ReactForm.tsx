import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useQueryClient, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(20, 'Password must not exceed 20 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
}).required();

const ReactForm = () => {
  const { register, handleSubmit, formState: { errors , } } = useForm({
     resolver: yupResolver(schema) });
const queryClient = useQueryClient();

  const saveToLocalStorage = async (data: any) => {
    const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
    const updatedData = [...existingData, data];
    localStorage.setItem('formData', JSON.stringify(updatedData));
    return data;                                                                           
  };

const {mutate: updateForm,isError,isPending,isSuccess} = useMutation({mutationFn: saveToLocalStorage,  onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["formData"] });
}})


  const onSubmit = (formData:any) => {
    return updateForm(formData);
  }

if(isPending) return <div>Loading...</div>
if(isError) return <div>Error: saving data</div>






  return (
    <div className=" flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                id="firstName"
                {...register('firstName')}
                type="text"
                placeholder="First Name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-red-500 text-xs italic">{errors.firstName?.message}</p>
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                id="lastName"
                {...register('lastName')}
                type="text"
                placeholder="Last Name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-red-500 text-xs italic">{errors.lastName?.message}</p>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                {...register('email')}
                type="email"
                placeholder="Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                {...register('password')}
                type="password"
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-red-500 text-xs italic">{errors.confirmPassword?.message}</p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
       
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReactForm;
