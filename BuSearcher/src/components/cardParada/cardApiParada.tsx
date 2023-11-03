import './cardParada.css'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

export interface LinhaParada {
    np: number,
    ed: string, 
    py: number,
    px: number,
    onCardClick?: (latitude: number, longitude: number) => void;
    map?: any;
}


export function CardApiParada({ np, ed, py, px, onCardClick } : LinhaParada): any {

    const map = useMap(); 

    const handleCardClick = () => {
        if (map) {
          map.flyTo([py, px], 18);
        }
        if (onCardClick) {
          onCardClick(px, py);
        }
      };

    return (
        <div className="card" onClick={handleCardClick}>
            <h2>Nome da parada {np}</h2>
            <p><b>Endereço de localização da parada </b>{ed}</p>
            <p><b>Latitude da localização da parada </b>{py}</p>
            <p><b>Longitude da localização da parada </b>{px}</p>
        </div>
    );
  }
