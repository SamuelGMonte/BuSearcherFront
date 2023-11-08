import { useMap } from 'react-leaflet';

export function useZoom() {
  const handleCardClick = (px: number, py: number) => {
    
  const map = useMap();
    map.flyTo([py, px], 18);
  };

  return handleCardClick;
}