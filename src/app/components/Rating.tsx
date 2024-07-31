"use client"
// components/Rating.js
import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';


export interface RatingProps {
    stars: number;
    onRated: (stars: number) => void;

}


const Rating = ({ stars, onRated }:RatingProps) => {
  const [value, setValue] = useState(stars);
  const [rating, setRating] = useState(stars);

  const handleClick = (newValue:number) => {
    setValue(newValue);
    setRating(newValue);
    if (onRated) {
      onRated(newValue);
    }
  };

  const handleMouseEnter = (newValue: number) => {
    setRating(newValue);
  };

  const handleMouseLeave = () => {
    setRating(value);
  };

  const starsList = [];

  for (let Star = 1; Star <= 5; Star++) {
    starsList.push(
      <span
        key={Star}
        className="star cursor-pointer"
        onMouseEnter={() => handleMouseEnter(Star)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(Star)}
      >

<MaterialSymbol  icon="star" size={32}  fill={Star <= rating ? false: true}
          grade={-25}
          color={Star <= rating ? 'yellow' : '#E8EAED'}  className=''/>

      </span>
    );
  }

  return <div className='flex justify-center items-center'>
    
    {starsList}
    
    </div>;
};

export default Rating;
