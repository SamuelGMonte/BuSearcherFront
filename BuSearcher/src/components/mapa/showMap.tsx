import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LinhaParada } from '../cardParada/cardApiParada';
import './map.css'

export interface MapWithMarkerProps {
  paradas: LinhaParada[];
}

export const MapWithMarker: React.FC<MapWithMarkerProps> = ({ paradas }) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if(paradas.length > 0) {
      const primeiraParada = paradas[0];
      setMapCenter([primeiraParada.px, primeiraParada.py]);
    }
  }, [paradas]);


  return (
    <MapContainer center={mapCenter} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {paradas.map((parada, index) => (
        <Marker key={index} position={[parada.py, parada.px]}>
          <Popup>
            <div>
              <p>Latitude: {parada.py}</p>
              <p>Longitude: {parada.px}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarker;
