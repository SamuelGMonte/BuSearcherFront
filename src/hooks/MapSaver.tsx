import { useMap } from "react-leaflet";

export function MapSaver({ setMap }: any) {
    const map = useMap();
    setMap(map);
    return null;
}