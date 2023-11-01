import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default function MapWithMarker({ coordinates }: any) {
  return (
    <div>
      <Marker position={coordinates}>
        <Popup>
          {coordinates}
        </Popup>
      </Marker>
    </div>
  );
}

