import { useQuery } from 'react-query'; 
import { LinhaParada } from '../components/cardParada/LinhaParada';
const API_URL = 'http://localhost:8080/parada';

const fetchDataName = async (termosBusca: string): Promise<LinhaParada[]> => {
    const response = await fetch(API_URL + `?param=${termosBusca}`, {
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
    return response.json();
}

export function useApiDataName(termosBusca: string) {
    const query = useQuery(['api-data-name', termosBusca], {
        queryFn: () => fetchDataName(termosBusca),
        retry: 2,
      });

    return{
        ...query,
        data: query.data,
    }
}