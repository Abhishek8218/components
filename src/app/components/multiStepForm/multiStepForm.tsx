'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormDataSchema } from './schema'

type Inputs = yup.InferType<typeof FormDataSchema>

const steps = [
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
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: {errors}
  } = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:border-t-4 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <div>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Personal Information
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Provide your personal details.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First name
                </label>
                <div className='mt-2'>
                  <Controller
                    name='firstName'
                    control={control}
                    render={({ field }) => (
                      <input
                        type='text'
                        id='firstName'
                        {...field}
                        autoComplete='given-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.firstName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last name
                </label>
                <div className='mt-2'>
                  <Controller
                    name='lastName'
                    control={control}
                    render={({ field }) => (
                      <input
                        type='text'
                        id='lastName'
                        {...field}
                        autoComplete='family-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.lastName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <input
                        id='email'
                        type='email'
                        {...field}
                        autoComplete='email'
        
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Address
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <Controller
                    name='country'
                    control={control}
                    render={({ field }) => (
                      <input
                        id='country'
                        type='text'
                        {...field}
                        autoComplete='country'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.country?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='street'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <Controller
                    name='street'
                    control={control}
                    render={({ field }) => (
                      <input
                        id='street'
                        type='text'
                        {...field}
                        autoComplete='street-address'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.street?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <Controller
                    name='city'
                    control={control}
                    render={({ field }) => (
                      <input
                        id='city'
                        type='text'
                        {...field}
                        autoComplete='address-level2'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.city?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='state'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State
                </label>
                <div className='mt-2'>
                  <Controller
                    name='state'
                    control={control}
                    render={({ field }) => (
                      <input
                        id='state'
                        type='text'
                        {...field}
                        autoComplete='address-level1'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.state?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='zip'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP code
                </label>
                <div className='mt-2'>
                  <Controller
                    name='zip'
                    control={control}
                    render={({ field }) => (
                      <input
                        id='zip'
                        type='text'
                        {...field}
                        autoComplete='postal-code'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    )}
                  />
                  {errors.zip?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className='flex justify-center'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Form Completed
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              You have completed the form.
            </p>
          </div>
        )}

        <div className='mt-8 flex items-center justify-between'>
          {currentStep > 0 && (
            <button
              type='button'
              onClick={prev}
              className='inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-300 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
            >
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type='button'
              onClick={next}
              className='inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-1.5 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
            >
              Next
            </button>
          ) : (
            <button
              type='submit'
              className='inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-1.5 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
