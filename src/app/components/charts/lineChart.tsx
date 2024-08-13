'use client'

// components/LineChart.tsx


import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { chartData } from './chart-data';
import { PosAnimation } from 'leaflet';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = () => {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'Sample Data',
//         data: [65, 59, 80, 81, 56, 55],
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor:'black',
        borderColor:'#B4B4B8',
        borderWidth: 1,
        bodyColor:'black',
        callbacks: {
          label: (tooltipItem:any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          color: '#333'
        },
      },
    },
    elements: {
      line: {
        tension: 0.1, // Smooth line
      },
      point: {
        radius: 5,
      },
    },
    layout: {
      padding: 20,
    },
    responsive: true,
    backgroundColor: '#f0f0f0', // Set chart background color here
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
        
  <div className="w-full h-96 bg-white shadow-md rounded-lg flex items-center justify-center">
      <Line data={chartData} options={options} />
  </div>
</div>
  )
};

export default LineChart;
