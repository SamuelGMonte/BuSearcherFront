import './card.css'

interface CardProps {
    price: number,
    title: string, 
    image: string
}

export function Card({ price, title, image } : CardProps) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p><b>Número da linha</b></p>
        </div>
    )
}
