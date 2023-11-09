import './cardHora.css';

export interface Veiculo {
  ta: string;
  py: number;
  px: number;
}

export interface Posicao {
  ta: any;
  hr: string;
  vs: Veiculo[];
}

export function CardApiHora({ posicao }: { posicao: Posicao }) {
  return (
    <div className="card">
      <h2>Hora: {posicao.hr}</h2>
      <p><b>Informações dos Veículos:</b></p>
      <ul>
        {posicao.vs.map((veiculo, index) => (
          <li key={index}>
            <p>Horário: {veiculo.ta}</p>
            <p>Latitude: {veiculo.py}</p>
            <p>Longitude: {veiculo.px}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}