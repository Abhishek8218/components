import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { MaterialSymbol } from 'react-material-symbols';
import 'leaflet/dist/leaflet.css';
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
  fetchLocation: boolean;

  userPosition: [number, number];
  userLocationIconUrl: string;
}

const LocationPicker = ({
  initialPosition,
  children,
  zoomFeatures,
  markerIcon,
  userPosition,
  fetchLocation
 
}: LocationPickerProps) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);


  const { minZoom, zoom, maxZoom, zoomControl } = zoomFeatures;

  



  const [hasFlownToUser, setHasFlownToUser] = useState<boolean>(false);


//Component to fly to user location
  const UserLocation = () => {
    const map = useMap();
    useEffect(() => {
      if (fetchLocation && !hasFlownToUser) {
        console.log('Flying to user position:', userPosition);
        map.flyTo(userPosition, zoom);
        setHasFlownToUser(true);
      }
    }, [fetchLocation, hasFlownToUser, userPosition, map, zoom]);

    return null;
  };






  const MapEvents = () => {
    const map = useMap();
    useMapEvents({
      moveend: () => {
        const center = map.getCenter();
        setPosition([center.lat, center.lng]);
      },
    });

 

      console.log('userPosition in map events:', userPosition);
    
    return null;
  };

  






  // Create custom icon for user location
  const createCustomIcon = (color: string) => {
    return new L.DivIcon({
      html: `  <div style="position: relative; width: 24px; height: 24px;">
          <div class="ping"></div>
          <div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white;"></div>
        </div>`,
      iconSize: [24, 24],
      className: '',
    });
  };
  const userLocationIcon = createCustomIcon('#318CE7');

    


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

        {userPosition && <Marker position={userPosition} icon={userLocationIcon} />}
        <MapEvents />
        <UserLocation/>
        <div className="absolute top-1/2 left-1/2 w-8 h-10 transform -translate-x-1/2 -translate-y-full z-[999]">
          {markerIcon}
        </div>

        <MaterialSymbol
          icon="my_location"
          size={32}
          fill
          grade={-25}
       onClick={() => {setHasFlownToUser(false)}}
          className="absolute bottom-20 right-10 z-[999]"
        />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
