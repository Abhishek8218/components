'use client';
import { useEffect, useState } from 'react';

export interface House {
    title: string;
    specialty: string;
   
  }
  
  interface MainProps {
    houses: House[];
    // updateHouse: (index: number, updatedHouse: House) => void;
  }
  
  const Chart = ({ houses}: MainProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editSpecialty, setEditSpecialty] = useState('');
  



    const classes = [
      "p1 mt-[-180px] ml-[210px] text-center w-[140px] ",
      "p2 mt-[-130px] ml-[120px]  w-[100px]",
      "p3 mt-[34px] ml-[20px] w-[100px]",
      "p4 mt-[110px] ml-[110px]     w-[100px]",
      "p5 mt-[100px] ml-[5px] w-[100px]",
      "p6 mt-[40px] ml-[110px] w-[100px]", 
      "p7 mt-[-140px] ml-[250px] w-[100px] text-center",
      "p8 mt-[40px] ml-[380px] w-[100px] text-end",
      "p9 mt-[-130px] ml-[470px] w-[100px] text-end",
      "p10 mt-[-200px] ml-[400px] w-[100px]",
      "p11 mt-[-200px] ml-[460px] w-[100px] text-center",
      "p12 mt-[-140px] ml-[389px] w-[100px] text-center",
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




const openModal = (index: number) => {
    setSelectedHouse(houses[index]);
setSelectedIndex(index);
setEditTitle(houses[index].title);
setEditSpecialty(houses[index].specialty);
setIsModalOpen(true);

    
};



const closeModal = () => {
    setIsModalOpen(false);
  };

//   const handleSave = () => {
//     if (selectedIndex !== null) {
//        const updatedHouse = { title: editTitle, specialty: editSpecialty };
//       updateHouse(selectedIndex, updatedHouse);
//     }
//     closeModal();
//   };




    return (
        <div className="px-[10vw]">
      <div className="main relative h-[600px] w-[600px]   border-4 border-[#E76F23] mx-auto mt-[60px] bg-[#FDC477] ">
        <div className=" h-[422px] w-[423px] border-4 border-solid border-[#E76F23] transform rotate-45 ml-[83px] mt-[84px]"></div>
        <div className=" h-[10px] w-[841px] border-b-4 border-[#E76F23] transform rotate-[135deg] mt-[-212px] ml-[-123px]"></div>
        <div className=" h-[10px] w-[842px] border-t-4 border-[#E76F23] transform -rotate-[135deg] ml-[-122px] mt-[-15px]"></div>
        
        {houses.map((house, index) => (
            
          <p key={index} className={`${classes[index]} font-base text-[#E76F23] hover:cursor-pointer z-10 relative`} onClick={() => openModal(index)}>
 {house.title}<sup>{getOrdinalSuffix(index + 1)}</sup><br />&nbsp;<span className="font-bold">{house.specialty}</span>
          </p>
        ))}

     
{isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
                        <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <h2 className="text-xl mb-4">House Information</h2>
                            <label className="block mb-2">
                                Title:
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="block w-full p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-4">
                                Specialty:
                                <input
                                    type="text"
                                    value={editSpecialty}
                                    onChange={(e) => setEditSpecialty(e.target.value)}
                                    className="block w-full p-2 border rounded"
                                />
                            </label>
                            {/* <div className="flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;