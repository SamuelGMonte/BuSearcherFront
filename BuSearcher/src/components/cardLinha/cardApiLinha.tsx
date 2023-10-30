import './cardLinha.css'

export interface LinhaData {
    cl: number,
    lt: string, 
    tp: string,
    ts: string
}

export function CardApiLinha({ cl, lt, tp, ts } : LinhaData) {
    return (
        <div className="card">
            <h2>Código linha: {cl}</h2>
            <p><b>Primeira parte do letreiro númerico: </b>{lt}</p>
            <p><b>letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal: </b>{tp}</p>
            <p><b>letreiro descritivo da linha no sentido Terminal Secundário para Terminal Secundário: </b>{ts}</p>
        </div>
    )
}
