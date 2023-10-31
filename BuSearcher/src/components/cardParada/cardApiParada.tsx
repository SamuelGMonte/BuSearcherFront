import './cardParada.css'
import { useRef, useState, useEffect } from 'react'

export interface LinhaParada {
    np: number,
    ed: string, 
    py: number,
    px: number,
}


export function CardApiParada({ np, ed, py, px } : LinhaParada) {
    const latRef = useRef<HTMLParagraphElement | null>(null);;
    const longRef = useRef<HTMLParagraphElement | null>(null); 

    const [latitude, setLatitude] = useState(py);
    const [longitude, setLongitude] = useState(px);
  
    useEffect(() => {
        if (latRef.current) {
          latRef.current.innerText = `Latitude da localização da parada: ${latitude}`;
        }
    
        if (longRef.current) {
          longRef.current.innerText = `Longitude da localização da parada: ${longitude}`;
        }
      }, [latitude, longitude]);
    

    return (
        <div className="card">
            <h2>Nome da parada {np}</h2>
            <p><b>Endereço de localização da parada </b>{ed}</p>
            
            <p ref={latRef}><b>Latitude da localização da parada </b>{py}</p>
            <p ref={longRef}><b>Longitude da localização da parada </b>{px}</p>
        </div>
    )
}