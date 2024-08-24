

 
  
  
'use client';

import React, { useEffect, useState } from 'react';
import Chart from '../components/chart';
import Image from 'next/image';
import { fetchHouses, fetchProfile, fetchBlog, House, BlogInfo, Profile } from '../components/fetchData';

const Page = () => {

  useEffect(() => {
    // Add the zoom class to the body element
    document.body.classList.add('zoom-04');
    
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('zoom-04');
    };
  }, []);

  const [houses, setHouses] = useState<House[]>([]);
  const [blogInfo, setBlogInfo] = useState<BlogInfo[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const view = false;

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const housesData = await fetchHouses();
        setHouses(housesData);

        const profileData = await fetchProfile();
        setProfile(profileData);

        const blogData = await fetchBlog();
        setBlogInfo(blogData);

        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChakraClick = (house: House) => {
    if (!view) {
      console.log('Data in Parent:', house);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center items-center overflow-hidden'>
      <div className='w-full sm:w-[98%] xl:w-[80%] md:border-[3px] md:border-[#ff883e] print:border-none select-none py-0  md:py-6 print:py-8'>
        <div>
          <div className='w-full flex justify-center items-center'><h1 className='text-4xl text-center mt-3 print:mt-0 w-[150px]'>LOGO</h1></div>
          
          <h1 className='text-3xl font-bold text-center mt-3 print:mt-0 text-[#E76F23]'>Astro Sarthee</h1>
          <p className='text-center text-sm font-semibold '>Guide for Your Important Things in Life</p>
          <h2 className='text-center text-xl font-semibold mt-3'>
            Astrologer - <span className='text-[#E76F23]'>Bheem Singh</span>
          </h2>
        </div>


        <hr className='border-b-2 border-[#ff883e] mt-6 print:mt-2 w-full' />
<div className='xl:flex xl:flex-col xl:justify-start xl:items-start print:flex-none '>
        <div className='text-left text-gray-600 font-semibold mt-8 text-[17px] px-10 md:pl-[200px] space-y-4'>
          {profile ? (
            <>
              <p>Date: <span className='font-medium text-[17px] text-gray-900'>{currentDate}</span></p>
            <div className='flex flex-col print:flex-row print:gap-[10rem] md:flex-row justify-start items-start md:gap-[12.5rem]'>
              <div  className='flex flex-col gap-2'>
              <p>Name: <span className='font-medium text-[17px] text-gray-900 mt-14'>{profile.fullName}</span></p>
              <p>Gender: <span className='font-medium text-[17px] text-gray-900'>{profile.gender}</span></p>
              <p>Date of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.dob}</span></p>
              <p>Nakshatra: <span className='font-medium text-[17px] text-gray-900'>{profile.Nakshatra}</span></p>
              <p>Nakshatra Lord: <span className='font-medium text-[17px] text-gray-900'>{profile.NakshatraLord}</span></p>
              <p>Chandra Rasi: <span className='font-medium text-[17px] text-gray-900'>{profile.ChandraRasi}</span></p>
              <p>Chandra Rasi Lord: <span className='font-medium text-[17px] text-gray-900'>{profile.ChandraRasiLord}</span></p>
              </div>
              <div className='flex flex-col gap-2'>
              <p>Day of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.day}</span></p>
              <p>Time of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.timeOfBirth}</span></p>
              <p>City: <span className='font-medium text-[17px] text-gray-900'>{profile.city}</span></p>
              <p>Zodiac Sign: <span className='font-medium text-[17px] text-gray-900'>{profile.ZodiacSign}</span></p>
              <p>Deity: <span className='font-medium text-[17px] text-gray-900'>{profile.Deity}</span></p>
              <p>Ganam: <span className='font-medium text-[17px] text-gray-900'>{profile.Ganam}</span></p>
              </div>
              </div>
            </>
          ) : (
            <div className='text-red-600'>Failed to load profile information.</div>
          )}
        </div>

        <div className='flex gap-5 print:flex-row  md:flex-row justify-center items-center print:gap-2 print:ml-0 md:gap-6  xl:ml-[-20px] lg:pl-[220px] '>
          <div className=''>
            <h1 className='text-xl font-bold text-center print:text-left print:ml-6  md:text-left mt-5 print:mt-5'>Lagna Chakra</h1>
            {error ? (
              <div className='text-red-600 text-center mt-4 '>{error}</div>
            ) : (
              <Chart houses={houses} onChakraClick={handleChakraClick} view={view} />
            )}
          </div>
          <div>
            <h1 className='text-xl font-bold text-center print:text-left print:mr-2 md:text-left mt-5'>Chandra Chakra</h1>
            {error ? (
              <div className='text-red-600 text-center mt-4'>{error}</div>
            ) : (
              <Chart houses={houses} onChakraClick={handleChakraClick} view={view} />
            )}
          </div>
        </div>

        <div className='mt-8 px-10 md:px-[200px] print:mt-[200px] print:py-10'>
          {blogInfo.length > 0 ? (
            blogInfo.map((info, index) => (
              <div key={index} className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800'>{info.heading}</h2>
                <p className='mt-2 text-gray-700'>{info.paragraph}</p>
              </div>
            ))
          ) : (
            <div className='text-gray-600 text-center mt-4'>No blog information available.</div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;


