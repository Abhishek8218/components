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
        <div className="">
      <div className="main relative h-[380px] w-[380px]   border-4 border-[#E76F23] mx-auto mt-[40px] bg-[#FDC477] ">
        <div className=" h-[268px] w-[268px] border-4 border-solid border-[#E76F23] transform rotate-45 ml-[53px] mt-[50px]"></div>
        <div className=" h-[10px] w-[528px] border-b-4 border-[#E76F23] transform rotate-[135deg] mt-[-135px] ml-[-74px]"></div>
        <div className=" h-[10px] w-[528px] border-t-4 border-[#E76F23] transform -rotate-[135deg] ml-[-76px] mt-[-16px]"></div>
        
        {houses.map((house, index) => (
            
          <p key={index} className={`${classes[index]} font-base text-sm text-[#E76F23] hover:cursor-pointer z-10 relative`} onClick={() => openModal(index)}>
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