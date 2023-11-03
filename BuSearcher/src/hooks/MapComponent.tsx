import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

export function MapComponent({ children }: any) {
  return (
    <MapContainer center={[0, 0]} zoom={1}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
    </MapContainer>
  );
}