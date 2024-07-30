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

  const profile = {
    name: "AKASH KUMAR",
    date: "16-07-1990",
    time: "15:44",
    latitude: "30.49981565",
    longitude: "77.86254573947093",
    fullName: "AKASH KUMAR",
    gender: "Male",
    dob: "16-07-1990",
    day: "Monday",
    timeOfBirth: "15:44",
    city: "Dehradun, Uttarakhand, India",
    fullLatitude: "30.49981565",
    fullLongitude: "77.86254573947093"
  };




  return (
    <div className='w-full flex  justify-center items-center overflow-hidden'>
    <div className=' w-[100%] sm:w-[98%] xl:w-[80%]  border-4 border-[#ff8438]  select-none py-10 px-2  md:p-10' >
<div className='flex justify-between items-center text-left'>
  <p className='text-sm font-semibold '>
    GST No.: 19AABCU9602F1ZU
  </p>
  <a href='mailto:' className='text-sm font-semibold '>Example@gmail.com</a>
  </div>

  <div>
<h1 className='text-7xl  text-center mt-20'>LOGO</h1>
    <h1 className='text-4xl font-bold text-center mt-20 text-[#E76F23]'>Astro Sarthee</h1>
    <p className='text-center text-base font-semibold mt-3'>Guide for Your Important Things in Life</p>
    <h2 className='text-center text-3xl font-semibold mt-3 '> Astrologer - <span className='text-[#E76F23]'>Bheem Singh</span></h2>

  </div>
  <hr className='border-b-2 border-gray-4 mt-10'/>
  <p className='text-sm font-semibold text-left mt-10'><span className='text-sm'>Date:</span>{currentDate}</p>
  <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg mt-10 ">
        <h1 className="text-4xl font-bold text-center mb-6">{profile.name}</h1>
        <div className="flex justify-between text-[#E76F23] text-lg mb-4 gap-4">
          <div>
            <p>Date : <span className="font-semibold">{profile.date}</span></p>
          </div>
          <div>
            <p>Time : <span className="font-semibold">{profile.time}</span></p>
          </div>
        </div>
</div>
</div>
        <div className="text-left text-lg md:pl-[200px]">
          <p>Name: <span className="font-semibold "> {profile.fullName}</span></p>
          <p>Gender: <span className="font-semibold"> {profile.gender}</span></p>
          <p>Date of Birth: <span className="font-semibold"> {profile.dob}</span></p>
          <p>Day of Birth: <span className="font-semibold"> {profile.day}</span></p>
          <p>Time of Birth: <span className="font-semibold"> {profile.timeOfBirth}</span></p>
          <p>City: <span className="font-semibold"> {profile.city}</span></p>
          <p>Latitude: <span className="font-semibold"> {profile.fullLatitude}</span></p>
          <p>Longitude: <span className="font-semibold"> {profile.fullLongitude}</span></p>
        </div>

<hr className='border-b-2 border-gray-4 mt-10'/>
<div className='flex flex-col md:flex-row justify-center items-center md:gap-10'>
  <div>
    <h1 className='text-2xl font-bold text-center mt-10'>Lagna Chakra</h1>
    <Chart houses={houses}/>
  </div>
  <div>
<h1 className='text-2xl font-bold text-center mt-10'>Chandra Chakra</h1>
<Chart houses={houses}/>
  </div>
</div>




      </div>
    </div>

  
  )
}

export default Page