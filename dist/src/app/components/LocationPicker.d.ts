import React from 'react';
import 'leaflet/dist/leaflet.css';
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
declare const LocationPicker: ({ initialPosition, children, zoomFeatures, markerIcon, userPosition, fetchLocation }: LocationPickerProps) => React.JSX.Element;
export default LocationPicker;
//# sourceMappingURL=LocationPicker.d.ts.map