import React from 'react'
import { BarChart } from '../components/charts/barChart'
import LineChart from '../components/charts/lineChart'

const page = () => {
  return (
    <div className='p-10'>
        <BarChart/>
        <LineChart/>
    </div>
  )
}

export default page