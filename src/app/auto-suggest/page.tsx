'use client'
import React, { useState } from 'react'
import SearchBar from '../components/AutoSuggest'

const Page = () => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const
    suggestions = [
     'Apple',
     'Banana',
     'Cherry',
     'Date',
     'Fig',
     'Grape',
     'Kiwi',
     'Apple',
     'Banana',
     'Cherry',
     'Date',
     'Fig',
     'Grape',
     'Kiwi',
     'Apple',
     'Banana',
     'Cherry',
     'Date',
     'Fig',
     'Grape',
     'Kiwi',
     'Apple',
     'Banana',
     'Cherry',
     'Date',
     'Fig',
     'Grape',
     'apple book',
     'Kiwi',
     'Apple',
     'Banana',
     'Cherry',
     'Date',
     'Fig',
     'Grape',
     'Kiwi',
     
     
   ];
   
   const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div><SearchBar  suggestions={suggestions} onSelect={handleSelect} />
    <p>Selected:{selectedValue}</p>
    </div>
  )
}

export default Page