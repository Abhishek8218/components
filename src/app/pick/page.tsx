'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MaterialSymbol } from 'react-material-symbols';

const LocationPicker = dynamic(() => import('../components/LocationPicker'), {
  ssr: false,
});

const Picker = () => {
  const [userPosition, setUserPosition] = useState<[number, number]>([0, 0]);
  const [fetchLocation, setFetchLocation] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
          setFetchLocation(true); // Recenter map after getting the position
      
          console.log('User position: in pick pagw', userPosition);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setFetchLocation(false);
        }
      );
    }
  }, []);
 

  const initialPosition: [number, number] = [userPosition[0], userPosition[1]];
  const zoomFeatures = {
    minZoom: 18,
    zoom: 20,
    maxZoom: 22,
    zoomControl: false,
  };
  const markerIcon = (
    <MaterialSymbol
      icon="location_on"
      size={32}
      fill
      grade={-25}
      color="black"
    />
  );

  return (
    <div className="h-screen w-full">
      <LocationPicker
        initialPosition={initialPosition}
        zoomFeatures={zoomFeatures}
        markerIcon={markerIcon}
        userPosition={userPosition}
        fetchLocation={fetchLocation}
        userLocationIconUrl="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
    </div>
  );
};

export default Picker;
