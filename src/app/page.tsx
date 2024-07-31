'use client';


import { useEffect, useState } from 'react';
import Chart from './components/chart';
import Rating from './components/Rating';
import CartCounter from './components/CartCounter';

export interface House {
  title: string;
  specialty: string;
}

const Home= () => {
  const [houses, setHouses] = useState<House[]>([]);

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
    
    </div>
  );
};

export default Home;
