import React from 'react'
import dynamic from 'next/dynamic';
import { MaterialSymbol } from 'react-material-symbols';


const LocationPicker = dynamic(() => import('../components/LocationPicker'), {
    ssr: false,
  });
const Picker = () => {


    const initialPosition: [number, number] = [30.3223292765723, 78.0467597766522];
    const zoomFeatures = {
       minZoom:  18,
      zoom : 20,
       maxZoom:  22,
       zoomControl : false,
    }
  
   const  markerIcon = (
    <MaterialSymbol
    icon="location_on"
    size={32}
    fill
    grade={-25}
    color="black"
    
  />
   );


  return (
    <div className='h-screen w-full'> 
<LocationPicker  initialPosition={initialPosition}
        zoomFeatures={zoomFeatures}
        markerIcon={markerIcon}/>
        
    </div>
  )
}

export default Picker