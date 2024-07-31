'use client';
import { useEffect, useState } from 'react';

export interface House {
    title: string;
    specialty: string;
   
   
  }
  
  interface MainProps {
    houses: House[];
    onChakraClick: (House: House) => void;
    view: boolean;
   
  }
  
  const Chart = ({ houses,onChakraClick,view}: MainProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editTitle, setEditTitle] = useState('');
    const [editSpecialty, setEditSpecialty] = useState('');
  



    const classes = [
      "p1 mt-[-130px] ml-[115px] text-center w-[140px] ",
      "p2 mt-[-85px] ml-[70px]  w-[100px]",
      "p3 mt-[20px] ml-[2px] w-[100px]",
      "p4 mt-[45px] ml-[65px]     w-[100px]",
      "p5 mt-[60px] ml-[5px] w-[100px]",
      "p6 mt-[25px] ml-[70px] w-[100px]", 
      "p7 mt-[-100px] ml-[135px] w-[100px] text-center",
      "p8 mt-[25px] ml-[214px] w-[100px] text-end",
      "p9 mt-[-116px] ml-[270px] w-[100px] text-end",
      "p10 mt-[-137px] ml-[250px] w-[100px]",
      "p11 mt-[-120px] ml-[285px] w-[100px] text-center",
      "p12 mt-[-100px] ml-[230px] w-[100px] text-center",
    ];
  


    const getOrdinalSuffix = (number: number): string => {
        if (number % 100 >= 11 && number % 100 <= 13) {
          return 'th';
        }
        switch (number % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };






const handleClick = (house: House) => {
    if (!view) {
      onChakraClick(house);
    }
  };






    return (
        <div className="">
      <div className="main relative h-[380px] w-[380px]   border-4 border-[#E76F23] mx-auto mt-[20px] bg-[#FDC477] ">
        <div className=" h-[268px] w-[268px] border-4 border-solid border-[#E76F23] transform rotate-45 ml-[53px] mt-[52px]"></div>
        <div className=" h-[10px] w-[528px] border-b-4 border-[#E76F23] transform rotate-[135deg] mt-[-135px] ml-[-74px]"></div>
        <div className=" h-[10px] w-[528px] border-t-4 border-[#E76F23] transform -rotate-[135deg] ml-[-76px] mt-[-16px]"></div>
        
        {houses.map((house, index) => (
            
          <p key={index} className={`${classes[index]} font-base text-sm text-[#E76F23]  z-10 relative ${view ? 'pointer-events-none ' : 'hover:cursor-pointer'}`} onClick={() => handleClick(house)}>
 {house.title}<sup>{getOrdinalSuffix(index + 1)}</sup><br />&nbsp;<span className="font-bold">{house.specialty}</span>
          </p>
        ))}

            </div>
        </div>
    );
};

export default Chart;