import './cardHora.css';

export interface ApiResponse {
  hr: string;
  l: LinhaInfo[];
}

export interface LinhaInfo {
  c: string;
  cl: number;
  sl: number;
  lt0: string;
  lt1: string;
  qv: number;
  vs: VeiculoStatus[];
}

export interface VeiculoStatus {
  p: number;
  a: boolean;
  ta: string;
  py: number;
  px: number;
}

export function CardApiHora({ posicao }: { posicao: ApiResponse & LinhaInfo}) {
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