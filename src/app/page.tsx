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


export interface House {
  title: string;
  specialty: string;
}

// Dynamically import the LocationPicker component with SSR disabled
const LocationPicker = dynamic(() => import('./components/LocationPicker'), {
  ssr: false,
});


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


  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <Rating stars={1} onRated={handleRated} />
      <CartCounter maxValue={10} minValue={0} />
      {data?.map((formData: any, index: number) => (
        <div key={index} className="p-4 border rounded-md shadow-sm">
          <h3 className="text-xl font-bold">{formData?.firstName} {formData?.lastName}</h3>
          <p>Email: {formData?.email}</p>
        </div>
      ))}
      <ReactForm/>

 

     {/* <Query/> */}
    </div>
  );
};

export default Home;
