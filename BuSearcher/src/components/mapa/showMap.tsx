import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LinhaParada } from '../cardParada/cardApiParada';
import './map.css'
import { LazyMotion } from 'framer-motion';

export interface MapWithMarkerProps {
  paradas: LinhaParada[];
  lat: number | null;
  long: number | null;
}

export const MapWithMarker: React.FC<MapWithMarkerProps> = ({ paradas, lat, long }) => {
  const map = useMap();

  // useEffect(() => {
  //   if (lat !== null && long !== null && mapRef.current) {
  //     mapRef.current.leafletElement.setView([lat, long], 5, {animation: true}); 
  //   }
  // }, [lat, long]);

  return (
    <MapContainer center={[0, 0]} zoom={5} style={{ height: '400px', width: '100%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {paradas.map((parada, index) => (
        <Marker
          key={index}
          position={{lat: parada.py,
                    lng: parada.px}}
          eventHandlers={{
            click: () => {
              map.setView(
                [
                  parada.px,
                  parada.py
                ],
                14
              )
            }
          }
        }
        >
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
