import './cardParada.css'
import { useZoom } from '../../hooks/zoom'

export interface LinhaParada {
    np: number,
    ed: string, 
    py: number,
    px: number,
}


export function CardApiParada({ np, ed, py, px, map } : LinhaParada & {map: any}) {
    const zoomToLocation = useZoom()(map);

    const handleCardClick = () => {
    zoomToLocation(px, py);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    };

    return (
        <div className="card" onClick={handleCardClick}>
            <h2><b>Nome da parada </b>{np}</h2>
            <p><b>Endereço de localização da parada </b>{ed}</p>
            <p><b>Latitude da localização da parada </b>{py}</p>
            <p><b>Longitude da localização da parada </b>{px}</p>
        </div>
        
  );
  }