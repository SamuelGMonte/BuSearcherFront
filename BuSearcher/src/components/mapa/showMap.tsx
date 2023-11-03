import { Marker, Popup } from 'react-leaflet';

export default function MapWithMarker( {latitude, longitude} : any) {
  return (
    <div>
      <Marker position={[latitude, longitude]}>
        <Popup>
          {[latitude, longitude]}
        </Popup>
      </Marker>
    </div>
  );
}

