'use client';


import { useEffect, useState } from 'react';
import Chart from './components/chart';
import Rating from './components/Rating';
import Head from 'next/head';
import LocationPicker from './components/LocationPicker';
import CartCounter from './components/CartCounter';
import { ZoomControl } from 'react-leaflet';

export interface House {
  title: string;
  specialty: string;
}

const Home= () => {
  const [houses, setHouses] = useState<House[]>([]);
  const initialPosition: [number, number] = [30.3223292765723, 78.0467597766522];
  const minZoom = 16;
  const zoom = 16;
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
  // const updateHouse = (index: number, updatedHouse: House) => {
  //   const newHouses = [...houses];
  //   newHouses[index] = updatedHouse;
  //   setHouses(newHouses);
  // };
  return (
    <div className=" flex flex-col justify-center items-center gap-16">
    <Rating stars={1} onRated={handleRated} />
    <CartCounter maxValue={10} minValue={0}/>
    <Head>
        <title>Location Picker</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
      </Head>
      <LocationPicker initialPosition={initialPosition} minZoom={minZoom} zoom={zoom} maxZoom={maxZoom} zoomControl={zoomControl} >
        <div>
          <input placeholder='search..' className='p-3'/>
        </div>
      </LocationPicker>
    
    </div>
  );
};

export default Home;
