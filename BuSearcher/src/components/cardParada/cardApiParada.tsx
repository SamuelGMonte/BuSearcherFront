import './cardParada.css'
import { useZoom } from '../../hooks/zoom'
import { LinhaData } from '../cardLinha/cardApiLinha';

export interface LinhaParada {
    np: number,
    ed: string, 
    py: number,
    px: number,
}

export interface LinhaDataLinhaParada extends LinhaParada, LinhaData  {}

export function CardApiParada({ np, ed, py, px, cl, lt, tp, ts, map } : LinhaDataLinhaParada & {map: any}) {
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
            <h2><b>Código linha: </b> {cl}</h2>
            <p><b>Primeira parte do letreiro númerico: </b>{lt}</p>
            <p><b>letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal: </b>{tp}</p>
            <p><b>letreiro descritivo da linha no sentido Terminal Secundário para Terminal Secundário: </b>{ts}</p>
            <p><b>Endereço de localização da parada </b>{ed}</p>
            <p><b>Latitude da localização da parada </b>{py}</p>
            <p><b>Longitude da localização da parada </b>{px}</p>
        </div>
        
  );
  }