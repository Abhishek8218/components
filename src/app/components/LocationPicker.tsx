'use client';


  
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { MaterialSymbol } from 'react-material-symbols';
import 'leaflet/dist/leaflet.css'


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
}

const LocationPicker = ({ initialPosition, children,zoomFeatures,markerIcon }: LocationPickerProps) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);


const { minZoom, zoom, maxZoom, zoomControl} = zoomFeatures;

//   useEffect(() => {
//     import('leaflet/dist/leaflet.css');
//   }, []);

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

  return (
    
    <div className="relative h-[500px] w-[500px]">
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
        />
        <MapEvents />
        <div className="absolute top-1/2 left-1/2 w-8 h-10 transform -translate-x-1/2 -translate-y-full z-[999]">
{markerIcon}
        </div >
     
      </MapContainer>
    </div>
  );
};


export default LocationPicker;
