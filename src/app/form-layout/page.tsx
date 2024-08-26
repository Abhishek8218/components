// pages/index.tsx
'use client'
import { useState } from 'react';
import DynamicForm from '../components/form-layout/dynamicForm';
import FormInput from '../components/form-layout/formInput';


const Page: React.FC = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        check: false,
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
    
        if (target.type === 'checkbox') {
          setFormValues({
            ...formValues,
            [target.id]: (target as HTMLInputElement).checked,
          });
        } else {
          setFormValues({
            ...formValues,
            [target.id]: target.value,
          });
        }
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);
      };
    
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <DynamicForm
            onSubmit={handleSubmit}
            columns={1} // Number of columns
            columnWidth="col-span-1" // Default column width for each item
            singleColumn={false} // Set to true to display in a single column
            className="w-full max-w-4xl"
          >
            <FormInput
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={formValues.email}
              onChange={handleChange}
    className="grid-cols-6" // Span 2 columns
            />
            <FormInput
              id="password"
              type="password"
              label="Password"
              value={formValues.password}
              onChange={handleChange}
              className='grid-cols-6' // Span 2 columns
            />
            <FormInput
              id="address"
              label="Address"
              placeholder="1234 Main St"
              value={formValues.address}
              className='grid-cols-6' // Span 2 columns
              onChange={handleChange}
            />
            <FormInput
              id="address2"
              label="Address 2"
              placeholder="Apartment, studio, or floor"
              value={formValues.address2}
              onChange={handleChange}
            />
            <FormInput
              id="city"
              label="City"
              value={formValues.city}
              onChange={handleChange}
            />
            <div className="flex flex-col">
              <label htmlFor="state" className="text-gray-700 mb-2">State</label>
              <select
                id="state"
                value={formValues.state}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Choose...</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                {/* Add more options here */}
              </select>
            </div>
            <FormInput
              id="zip"
              label="Zip"
              value={formValues.zip}
              onChange={handleChange}
            />
            <div className="flex items-center">
              <input
                id="check"
                type="checkbox"
                checked={formValues.check}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="check" className="text-gray-700">Check me out</label>
            </div>
          </DynamicForm>
        </div>
      );
    };

export default Page;
