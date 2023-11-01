import { useMap } from 'react-leaflet';

export function FlyMapTo({ latitude, longitude}: any) {
  const map = useMap();

  
  map.flyTo([latitude, longitude], 15); 

  return null; 
}