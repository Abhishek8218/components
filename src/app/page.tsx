'use client';


import dynamic from 'next/dynamic';
import { lazy, useEffect, useState } from 'react';
import Head from 'next/head';
import Rating from './components/Rating';
import CartCounter from './components/CartCounter';




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
  const minZoom = 16;
  const zoom = 18;
  const maxZoom = 20;
  const zoomControl = false;

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

  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <Rating stars={1} onRated={handleRated} />
      <CartCounter maxValue={10} minValue={0} />
      <Head>
        <title>Location Picker</title>
      </Head>
      <LocationPicker
        initialPosition={initialPosition}
        minZoom={minZoom}
        zoom={zoom}
        maxZoom={maxZoom}
        zoomControl={zoomControl}
      >
        <div>
          <input placeholder="search.." className="p-3" />
        </div>
      </LocationPicker>
    </div>
  );
};

export default Home;
