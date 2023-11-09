import { useMap } from 'react-leaflet';

export function useZoom() {
  return (map) => (px, py) => {
   map.flyTo([py, px], 18);
  };
 }