import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import ShowMap from './showMap';

export default function ShowMapOnly() {
 
  return (
    <div>
      <MapContainer center={[0, 0]} zoom={13} style={{ height: '500px', width: '500px' }}>
        <TileLayer 
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
        <ShowMap latitude={51.505} longitude={-0.09} />
      </MapContainer>
    </div>
  );
}
