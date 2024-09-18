'use client'

import React, { useEffect } from 'react'
import { BarChart } from '../components/charts/barChart'
import LineChart from '../components/charts/lineChart'

const Page = () => {
  // useEffect(() => {
  //   // Add the zoom class to the body element
  //   document.body.classList.add('zoom-04');
    
  //   // Clean up the class when the component unmounts
  //   return () => {
  //     document.body.classList.remove('zoom-04');
  //   };
  // }, []);
  return (


    
    <div className='py-10 px-2 space-y-[50px]'>
        <BarChart/>
        <LineChart/>
    </div>
  )
}

export default Page