export function useZoom() {
  return (map: any) => (px: any, py: any) => {
   map.flyTo([py, px], 18);
  };
 }