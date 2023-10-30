import './cardParada.css'

export interface LinhaParada {
    np: number,
    ed: string, 
    py: number,
    px: number,
    numberCount: number
}

export function CardApiParada({ np, ed, py, px } : LinhaParada) {
    return (
        <div className="card">
            <h2>Nome da parada {np}</h2>
            <p><b>Endereço de localização da parada </b>{ed}</p>
            <p><b>Latitude da localização da parada </b>{py}</p>
            <p><b>Longitude da localização da parada </b>{px}</p>
        </div>
    )
}