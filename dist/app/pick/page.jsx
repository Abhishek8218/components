'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MaterialSymbol } from 'react-material-symbols';
var LocationPicker = dynamic(function () { return import('../components/LocationPicker'); }, {
    ssr: false,
});
var Picker = function () {
    var _a = useState([28.644800, 77.216721]), userPosition = _a[0], setUserPosition = _a[1];
    var _b = useState(false), fetchLocation = _b[0], setFetchLocation = _b[1];
    useEffect(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setUserPosition([position.coords.latitude, position.coords.longitude]);
                setFetchLocation(true); // Recenter map after getting the position
                console.log('User position: in pick pagw', userPosition);
            }, function (error) {
                console.error('Error getting user location:', error);
                setFetchLocation(false);
            });
        }
    }, []);
    var initialPosition = [userPosition[0], userPosition[1]];
    var zoomFeatures = {
        minZoom: 18,
        zoom: 20,
        maxZoom: 22,
        zoomControl: false,
    };
    var markerIcon = (<MaterialSymbol icon="location_on" size={32} fill grade={-25} color="black"/>);
    return (<div className="h-screen w-full">
      <LocationPicker initialPosition={initialPosition} zoomFeatures={zoomFeatures} markerIcon={markerIcon} userPosition={userPosition} fetchLocation={fetchLocation} userLocationIconUrl="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"/>
    </div>);
};
export default Picker;
