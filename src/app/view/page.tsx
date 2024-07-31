'use client';

import React, { useEffect, useState } from 'react';
import Chart from '../components/chart';
import Image from 'next/image';
import { fetchHouses, fetchProfile, fetchBlog, House, BlogInfo, Profile } from '../components/fetchData';

const Page = () => {
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
      <div className='w-full sm:w-[98%] xl:w-[80%] md:border-[3px] md:border-[#ff883e] print:border-none select-none py-0 print:pt-[200px] md:py-6'>
        <div className='w-full flex justify-center items-center mt-5'>
          <Image src='/ganesh.png' width={60} height={60} alt='logo' className='bg-white' />
        </div>

        <div className='flex flex-col justify-center gap-2 mt-10 items-center text-left'>
          <p className='text-sm font-semibold'>GST No.: 19AABCU9602F1ZU</p>
          <a href='mailto:example@gmail.com' className='text-sm font-semibold'>example@gmail.com</a>
        </div>

        <div>
          <h1 className='text-7xl text-center mt-5 print:mt-0'>LOGO</h1>
          <h1 className='text-3xl font-bold text-center mt-5 print:mt-0 text-[#E76F23]'>Astro Sarthee</h1>
          <p className='text-center text-base font-semibold mt-3'>Guide for Your Important Things in Life</p>
          <h2 className='text-center text-2xl font-semibold mt-3'>
            Astrologer - <span className='text-[#E76F23]'>Bheem Singh</span>
          </h2>
        </div>

        <hr className='border-b-2 border-[#ff883e] mt-6 print:mt-2 w-full' />

        <div className='text-left text-gray-600 font-semibold mt-8 text-[17px] px-10 md:pl-[200px] space-y-4'>
          {profile ? (
            <>
              <p>Date: <span className='font-medium text-[17px] text-gray-900'>{currentDate}</span></p>
              <p>Name: <span className='font-medium text-[17px] text-gray-900'>{profile.fullName}</span></p>
              <p>Gender: <span className='font-medium text-[17px] text-gray-900'>{profile.gender}</span></p>
              <p>Date of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.dob}</span></p>
              <p>Day of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.day}</span></p>
              <p>Time of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.timeOfBirth}</span></p>
              <p>City: <span className='font-medium text-[17px] text-gray-900'>{profile.city}</span></p>
            </>
          ) : (
            <div className='text-red-600'>Failed to load profile information.</div>
          )}
        </div>

        <div className='flex flex-col print:flex-col md:flex-row justify-center items-center md:gap-6 print:mt-[650px] xl:ml-[-20px]'>
          <div>
            <h1 className='text-xl font-bold text-center md:text-left mt-5 print:mt-0'>Lagna Chakra</h1>
            {error ? (
              <div className='text-red-600 text-center mt-4'>{error}</div>
            ) : (
              <Chart houses={houses} onChakraClick={handleChakraClick} view={view} />
            )}
          </div>
          <div>
            <h1 className='text-xl font-bold text-center md:text-left mt-5'>Chandra Chakra</h1>
            {error ? (
              <div className='text-red-600 text-center mt-4'>{error}</div>
            ) : (
              <Chart houses={houses} onChakraClick={handleChakraClick} view={view} />
            )}
          </div>
        </div>

        <div className='mt-8 px-10 md:px-[200px] print:mt-[100px]'>
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
  );
};

export default Page;
