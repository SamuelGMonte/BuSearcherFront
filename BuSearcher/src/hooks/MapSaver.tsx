import { useMap } from "react-leaflet";

export function MapSaver({ setMap }) {
    const map = useMap();
    setMap(map);
    return null;
}