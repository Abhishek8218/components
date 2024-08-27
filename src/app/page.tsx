'use client';


import dynamic from 'next/dynamic';
import { lazy, useEffect, useState } from 'react';
import Rating from './components/Rating';
import CartCounter from './components/CartCounter';
import { marker } from 'leaflet';
import { MaterialSymbol } from 'react-material-symbols';
import ReactForm from './components/ReactForm';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import SearchBar from './components/AutoSuggest';
import ForwardedTextInput from './components/Input';
import Input from './components/Input';
//import DatePicker from './components/DatePicker/DatePIcker';
import TimePicker from './components/TimePicker/TimePicker';
import DateRangePicker from './components/DateRangeSelector/RangeSelector';
import EventCalendar from './components/eventCalendar/eventCalendar';
import MultiSelectSearchBar from './components/multiSelectInput/multiSelectInput';
import MultiSelectDropdown from './components/multiSelectCheckBoxInput/multiSelectCheckBoxInput';
import SingleSelectDropdown from './components/singleSelectInput/singleSelectInput';
import TimeSelector from './components/TimeSelector/TimeSelector';
import {DatePicker} from "nextjs-ui-components";
import MobileInput from './components/mobileInput';
import CheckboxGroup from './components/groupCheckBox/checkBoxGroup';
// import { OTPInput } from './components/otp/otpVerification';


export interface House {
  title: string;
  specialty: string;
}

// Dynamically import the LocationPicker component with SSR disabled
const LocationPicker = dynamic(() => import('./components/LocationPicker'), {
  ssr: false,
});
const
 suggestions = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Kiwi',
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Kiwi',
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Kiwi',
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'apple book',
  'Kiwi',
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Kiwi',
  
  
];


const Home = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const initialPosition: [number, number] = [30.3223292765723, 78.0467597766522];
  const zoomFeatures = {
     minZoom:  16,
    zoom : 18,
     maxZoom:  22,
     zoomControl : false,
  }

 const  markerIcon = (
  <MaterialSymbol
  icon="location_on"
  size={32}
  fill
  grade={-25}
  color="black"
  
/>
 );





  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/houses.json');
      const data: House[] = await response.json();
      setHouses(data);
    };

    fetchData();
  }, []);

  const handleRated = (newRating: number) => {
    console.log(`The new rating is: ${newRating}`);
  };







  const fetchFromLocalStorage = async () => {
    const data = JSON.parse(localStorage.getItem('formData') || '[]');
    return data;
  };
  const { data, isLoading, isError } = useQuery({queryKey:['formData'], queryFn: fetchFromLocalStorage});




  

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [multiSelectInputValue, setMultiSelectInputValue] = useState<string>('');
  const [singleSelectInputValue, setSingleSelectInputValue] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };


  const handleMultiSelect = (values: string[]) => {
    console.log(values);
     setSingleSelectInputValue(values.join(', '));
  }

  const handleSingleSelect = (value: string) => {
    console.log(value);
     setSingleSelectInputValue(value);
  }


  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState('');
  
    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);
  
    return userAgent;
  };

  const userAgent = useUserAgent();

  const isMobile = /Mobi|Android/i.test(userAgent);

  const handleTimeChange = (time: string) => {
    console.log('Selected Time:', time);
  };


  const handleMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }
  



  const handleVerify = (otp: string) => {
    // Implement OTP verification logic here
    console.log('Verifying OTP:', otp);

    // Example: Mock verification logic
    if (otp === '123456') {
      alert('OTP Verified Successfully');
    } else {
      alert('Invalid OTP');
    }
  };

  const handleResend = () => {
    // Implement OTP resend logic here
    console.log('Resending OTP');

    // Example: Mock resend logic
    // You might want to trigger an actual API call to resend the OTP
  };




//Group Check Box 
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (values: string[]) => {
    console.log(values)
    setSelectedValues(values);
  };
 
  const options = [
    {
      label: 'Option 1',
      value: 'option1',
      
    },
    {
      label: 'Option 2',
      value: 'option2',
     
    },
    {
      label: 'custom',
      value: 'custom',
     
    },
    {
      label: 'Option 3',
      value: 'option3',
      subOptions: [
        { label: 'Sub Option 3.1', value: 'subOption3.1' },
        { label: 'Sub Option 3.2', value: 'subOption3.2' },
      ],
     
    },
    {
      label: 'Option 4',
      value: 'option4',
      subOptions: [
        { label: 'Sub Option 4.1', value: 'subOption4.1' },
        { label: 'Sub Option 4.2', value: 'subOption4.2' },
      ],
     
    },
  ];
console.log("selected group checbox values",selectedValues)

  return (
    <div className="flex flex-col justify-center items-center gap-16">
 {/* <OTPInput onVerify={handleVerify} onResend={handleResend} /> */}
 <h1 className="text-xl font-semibold text-gray-800 mb-4">Select Your Options</h1>
        <CheckboxGroup options={options}  onChange={handleSelectionChange} />
        <p className="mt-4 text-sm text-gray-500">Selected Values in parent : {selectedValues.join(', ')}</p>

      <Rating stars={1} onRated={handleRated} />
      <CartCounter maxValue={10} minValue={0} />
      {data?.map((formData: any, index: number) => (
        <div key={index} className="p-4 border rounded-md shadow-sm">
          <h3 className="text-xl font-bold">{formData?.firstName} {formData?.lastName}</h3>
          <p>Email: {formData?.email}</p>
        </div>
      ))} 
      <SearchBar suggestions={suggestions} onSelect={handleSelect} />
      <p className="mt-4">Selected: {selectedValue}</p>
      <Input type='text' placeholder='Enter your name' onChange={(event) => console.log(event.target.value)} />
      <DatePicker/>

<TimePicker/>
<DateRangePicker/>



<div>
  {isMobile ? (
    <p>You are using a mobile device</p>
  ) : (
    <p>You are using a desktop device</p>
  )}

 

  {/* Render different components based on user agent */}

</div>
 <EventCalendar/>

 <MultiSelectSearchBar  suggestions={suggestions} onSelect={handleMultiSelect}/>
 <p className="mt-4">Selected: {multiSelectInputValue}</p>


 <p className='mb-[-55px] mr-10'>Multi Select Check BOx</p>
 <MultiSelectDropdown options={suggestions} onSelect={handleMultiSelect} />

 <p className='mb-[-55px] mr-10'>Single Select Check BOx</p>
 <SingleSelectDropdown options={suggestions} onSelect={handleSingleSelect} />
 <p>Single Select Value : {singleSelectInputValue}</p>

<TimeSelector onChange={handleTimeChange}/>
<div className='mt-[500px]'>h</div>


<ReactForm/>


<MobileInput onChange={handleMobile}/>

<DatePicker/>



 
     {/* <Query/> */}
    </div>
  );
};

export default Home;
