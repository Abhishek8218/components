export interface House {
    title: string;
    specialty: string;
  }
  
  interface MainProps {
    houses: House[];
  }
  
  const Chart = ({ houses }: MainProps) => {
    const classes = [
      "p1 mt-[-180px] ml-[0px] text-center ",
      "p2 mt-[-130px] ml-[120px] ",
      "p3 mt-[34px] ml-[20px]",
      "p4 mt-[110px] ml-[110px]",
      "p5 mt-[100px] ml-[5px]",
      "p6 mt-[40px] ml-[110px]",
      "p7 mt-[-140px] ml-[10px] text-center",
      "p8 mt-[40px] mr-[120px] text-end",
      "p9 mt-[-130px] mr-[15px] text-end",
      "p10 mt-[-200px] ml-[400px]",
      "p11 mt-[-200px] ml-[460px] text-center",
      "p12 mt-[-140px] ml-[300px] text-center",
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

    return (
      <div className="main relative h-[600px] w-[600px]  border-4 border-[#E76F23] mx-auto mt-[60px] bg-[#FDC477] ">
        <div className=" h-[422px] w-[423px] border-4 border-solid border-[#E76F23] transform rotate-45 ml-[83px] mt-[84px]"></div>
        <div className=" h-[10px] w-[841px] border-b-4 border-[#E76F23] transform rotate-[135deg] mt-[-212px] ml-[-123px]"></div>
        <div className=" h-[10px] w-[842px] border-t-4 border-[#E76F23] transform -rotate-[135deg] ml-[-122px] mt-[-15px]"></div>
        
        {houses.map((house, index) => (
            
          <p key={index} className={`${classes[index]} font-base text-[#E76F23]`}>
 {house.title}<sup>{getOrdinalSuffix(index + 1)}</sup><br />&nbsp;<span className="font-bold">{house.specialty}</span>
          </p>
        ))}
      </div>
    );
  };
  
  export default Chart;
  