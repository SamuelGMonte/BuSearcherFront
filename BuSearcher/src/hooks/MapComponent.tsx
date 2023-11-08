import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useZoom } from './zoom';
import { CardApiParada } from '../components/cardParada/cardApiParada';
import { useApiDataName } from './useApiDataName';

export function MapComponent() {
  const [termosBusca, setTermosBusca] = useState('');
  const { data: nameData} = useApiDataName(termosBusca);
  // const handleCardClick = useZoom()

  return (
    <MapContainer center={[0, 0]} zoom={1}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}