'use client';


  
import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { MaterialSymbol } from 'react-material-symbols';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

interface ZoomFeatures {
  minZoom: number;
  zoom: number;
  maxZoom: number;
  zoomControl: boolean;
}

interface LocationPickerProps {
  initialPosition: [number, number];
  
  zoomFeatures: ZoomFeatures;
  markerIcon: React.ReactNode;
  children?: React.ReactNode;
  userPosition?: [number, number];
  userLocationIconUrl: string;
  handleLocationSearch: Function;
}





const LocationPicker = ({ initialPosition, children,zoomFeatures,markerIcon,userPosition,userLocationIconUrl,handleLocationSearch}: LocationPickerProps) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);


const { minZoom, zoom, maxZoom, zoomControl} = zoomFeatures;


// Map events
  const MapEvents = () => {
    useMapEvents({
      moveend: (event) => {
        const map = event.target;
        const center = map.getCenter();
        setPosition([center.lat, center.lng]);
      },
    });
    return null;
  };
    
  useEffect(() => {
    console.log('Current position:', position);
  }, [position]);




  // Create custom icon for user location
const createCustomIcon = (color: string) => {
    return new L.DivIcon({
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white;"></div>`,
      iconSize: [24, 24],
      className: '',
    });
  };

  const userLocationIcon = createCustomIcon('#0e4ce9');

  const handleRecenter = () => {
    setPosition([userPosition?.[0] ?? 0, userPosition?.[1] ?? 0]);//ToDo: FIx this to recenter the map
  }
  
  return (
    
    <div className="relative h-screen w-screen">
      <div className="absolute text-red-500 z-[1000] w-full flex justify-center items-center mt-2">
        {children}
      </div>
      <MapContainer
        center={position}
        minZoom={minZoom}
        zoom={zoom}

        maxZoom={maxZoom}
        zoomControl={zoomControl}
        className="h-full w-full"
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/upaharhousenepal/cl1tf387y004214mvfq2utlaw/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXBhaGFyaG91c2VuZXBhbCIsImEiOiJjbDAycmttNG4xNnE5M2Nwa3VvbmczdjgxIn0.8DwZzdG46rwqvzrYVcUI4g"
        maxNativeZoom={22}
        maxZoom={22}
        
        />

{userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}/>
        
        )}
        <MapEvents />
        <div className="absolute top-1/2 left-1/2 w-8 h-10 transform -translate-x-1/2 -translate-y-full z-[999]">
{markerIcon}
        </div >

        <div>
        <MaterialSymbol  icon="my_location" size={32}  fill
          grade={-25}
        onClick={handleRecenter}
          className='absolute bottom-10 right-10 z-[999]'
    />

        </div>
     
      </MapContainer>
    </div>
  );
};


export default LocationPicker;
