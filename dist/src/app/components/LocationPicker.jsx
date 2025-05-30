import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { MaterialSymbol } from 'react-material-symbols';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
var LocationPicker = function (_a) {
    var initialPosition = _a.initialPosition, children = _a.children, zoomFeatures = _a.zoomFeatures, markerIcon = _a.markerIcon, userPosition = _a.userPosition, fetchLocation = _a.fetchLocation;
    var _b = useState(initialPosition), position = _b[0], setPosition = _b[1];
    var minZoom = zoomFeatures.minZoom, zoom = zoomFeatures.zoom, maxZoom = zoomFeatures.maxZoom, zoomControl = zoomFeatures.zoomControl;
    var _c = useState(false), hasFlownToUser = _c[0], setHasFlownToUser = _c[1];
    //Component to fly to user location
    var UserLocation = function () {
        var map = useMap();
        useEffect(function () {
            if (fetchLocation && !hasFlownToUser) {
                console.log('Flying to user position:', userPosition);
                map.flyTo(userPosition, zoom);
                setPosition(userPosition);
                setHasFlownToUser(true);
            }
        }, [fetchLocation, hasFlownToUser, userPosition, map, zoom]);
        return null;
    };
    console.log("user position", position);
    var MapEvents = function () {
        var map = useMap();
        useMapEvents({
            moveend: function () {
                var center = map.getCenter();
                setPosition([center.lat, center.lng]);
            },
        });
        console.log('position in map events:', position);
        //console.log('userPosition in map events:', userPosition);
        return null;
    };
    // Create custom icon for user location
    var createCustomIcon = function (color) {
        return new L.DivIcon({
            html: "  <div style=\"position: relative; width: 24px; height: 24px;\">\n          <div class=\"ping\"></div>\n          <div style=\"background-color: ".concat(color, "; width: 24px; height: 24px;margin-top:-12px; border-radius: 50%; border: 2px solid white;\"></div>\n        </div>"),
            iconSize: [24, 24],
            className: '',
        });
    };
    var userLocationIcon = createCustomIcon('#318CE7');
    return (<div className="relative h-screen w-screen">
      <div className="absolute text-red-500 z-[1000] w-full flex justify-center items-center mt-2">
        {children}
      </div>
      <MapContainer center={position} minZoom={minZoom} zoom={zoom} maxZoom={maxZoom} zoomControl={zoomControl} className="h-full w-full">
        <TileLayer url="https://api.mapbox.com/styles/v1/upaharhousenepal/cl1tf387y004214mvfq2utlaw/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXBhaGFyaG91c2VuZXBhbCIsImEiOiJjbDAycmttNG4xNnE5M2Nwa3VvbmczdjgxIn0.8DwZzdG46rwqvzrYVcUI4g" maxNativeZoom={22} maxZoom={22}/>

        {userPosition && <Marker position={userPosition} icon={userLocationIcon}/>}
        <MapEvents />
        <UserLocation /> 
        <div className="absolute top-1/2 left-1/2  w-8 h-10 transform -translate-x-1/2 -translate-y-full z-[999]">
          {markerIcon}
        </div>

        <MaterialSymbol icon="my_location" size={40} fill grade={-25} onClick={function () { setHasFlownToUser(false); }} className="absolute bottom-20 right-10 z-[999] hover:scale-150 cursor-pointer transition-all ease-in-out duration-500"/>
      </MapContainer>
    </div>);
};
export default LocationPicker;
