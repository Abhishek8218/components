'use client';


import { useEffect, useState } from 'react';
import Chart from './components/chart';

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

  // const updateHouse = (index: number, updatedHouse: House) => {
  //   const newHouses = [...houses];
  //   newHouses[index] = updatedHouse;
  //   setHouses(newHouses);
  // };
  return (
    <div className="">
      <Chart houses={houses}/>
    </div>
  );
};

export default Home;
