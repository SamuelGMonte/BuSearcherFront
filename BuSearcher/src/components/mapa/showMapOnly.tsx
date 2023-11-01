import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapWithMarker from './showMap';

export default function showMap() {
  return (
    <div>
      <MapContainer center={[0, 0]} zoom={13} style={{ height: '500px', width: '500px' }}>
        <TileLayer 
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
        <MapWithMarker coordinates={[51.505, -0.09]} />
      </MapContainer>
    </div>
  );
}


