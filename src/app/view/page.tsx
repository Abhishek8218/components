'use client'


import React, { useEffect, useState } from 'react'
import Chart from '../components/chart';


export interface House {
  title: string;
  specialty: string;
}
const Page = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });




  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/houses.json');
      const data: House[] = await response.json();
      setHouses(data);
    };

    fetchData();
  }, []);

  return (
    <div className='text-white select-none' >
      <div className='w-full h-16 flex flex-row justify-between px-10 py-4 border-b-[2px] border-b-gray-700 text-white ' >
        <p className='font-semibold font-mono'> GST No.: n378eahe73ssqw2</p>
        <p className='font-semibold font-mono hidden sm:block'>1-Page</p>
        <a href='mailto:exmaple@gmail.com' className='font-semibold font-mono'>Exampl@gmail.com</a>
      </div>
      <div className='py-20'>
        <h1 className='text-7xl font-semibold font-serif  text-center text-[#E76F23]'>Astro Sarthee</h1>
        <p className='text-lg font-semibold font-sans text-center mt-2'>Guide for Your Important Things of Life</p>
        <h2 className='text-4xl font-semibold font-serif text-center mt-5'>Astrologer - <span className='text-[#E76F23]'>Bheem Singh</span></h2>
      </div>
      <p className='font-semibold font-serif text-end mr-20 -mt-5 underline'>Date: {currentDate}</p>
      <div className=' flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-40 py-10   sm:px-0'>
        <div className='flex flex-col w-full sm:w-auto p-10'>
          <label htmlFor='dob' className='text-lg font-semibold mb-2 '>Date of Birth</label>
          <input 
            type='date' 
            id='dob'
            className='p-3 rounded-lg border-[1px] border-gray-400 text-black select-none w-[250px]'
          />
        </div>
        <div className='flex flex-col w-full sm:w-auto p-10'>
          <label htmlFor='time' className='text-lg font-semibold mb-2'>Birth Time</label>
          <input 
            type='time' 
            id='time'
            className='p-3 rounded-lg border-[1px] border-gray-400 text-black select-none w-[250px]'
          />
        </div>
        <div className='flex flex-col w-full sm:w-auto p-10'>
          <label htmlFor='place' className='text-lg font-semibold mb-2'>Birth Place</label>
          <input 
            type='text' 
            id='place'
            className='p-3 rounded-lg border-[1px] border-gray-400 text-black select-none w-[250px]'
            placeholder='Enter your birth place'
          />
        </div>
      </div>

<div className='flex flex-col md:flex-row justify-center items-center gap-10'>

  {/* Lagan Chart */}
<div >
  <h3 className='text-4xl font-serif text-center text-[#E76F23]'>Lagan Chakra</h3>
<Chart houses={houses}/>
</div>


<div>
  <h3 className='text-4xl font-serif text-center text-[#E76F23]'>Chandra Chart</h3>
<Chart houses={houses}/>
</div>
</div>



    </div>
  )
}

export default Page