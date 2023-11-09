import { useQuery } from 'react-query'; 
import { LinhaParada } from "../../components/cardParada/cardApiParada";
import { Posicao, Veiculo } from '../../components/cardHour/cardApiHour';
const API_URL = 'http://localhost:8080/posicao';

const fetchDataName = async (codigoLinha: number): Promise<Array<Posicao | Veiculo>> => {
    const response = await fetch(API_URL + `?param=${codigoLinha}`, {
        headers: {
            "Content-Type": "application/json",
          },
    });
    try{
        if(!response.ok) {
            throw new Error("Falha na busca de dados");
        }
    }
    catch(error: any) {
        throw new Error(`Error while fetching data: ${error.message}`);
    }
    const data = await response.json();
    
    const dataOnibus = data.map((item: any) => ({
        hr: item.hr,
        ta: item.ta,
        px: item.px,
        py: item.py,
    }));

    return dataOnibus
}

export function useApiDataName(codigoLinha: number) {
    const query = useQuery(['api-data-name', codigoLinha], {
        queryFn: () => fetchDataName(codigoLinha),
        retry: 2,
      });


    return {
        ...query,
        data: query.data,
        hr: query.data ? query.data.map((item) => ('hr' in item ? item.hr : item.ta)) : [],
        ta: query.data ? query.data.map((item) => ('hr' in item ? item.ta : '')) : [],
        px: query.data ? query.data.map((item) => ('px' in item ? item.px : 0)) : [],
        py: query.data ? query.data.map((item) => ('py' in item ? item.py : 0)) : [],
    }
    
}