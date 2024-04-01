import { useQuery } from 'react-query'; 
import { LinhaParada } from "../../components/cardParada/cardApiParada";
const API_URL = 'https://busearcher.rj.r.appspot.com/parada';

const fetchDataName = async (termosBusca: string): Promise<LinhaParada[]> => {
    if (!termosBusca) {
        return [];    
    }
    
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

    const data = await response.json();
    
    const coordData = data.map((item: any) => ({
        ed: item.ed,
        np: item.np,
        px: item.px,
        py: item.py,
    }));

    return coordData
}

export function useApiDataName(termosBusca: string) {

    const query = useQuery(['api-data-name', termosBusca], {
        queryFn: () => fetchDataName(termosBusca),
        retry: 2,
      });


    return{
        ...query,
        data: query.data,
        ed: query.data ? query.data.map((item: LinhaParada) => item.ed) : [],
        np: query.data ? query.data.map((item: LinhaParada) => item.np) : [],
        px: query.data ? query.data.map((item: LinhaParada) => item.px) : [],
        py: query.data ? query.data.map((item: LinhaParada) => item.py) : [],
    }
}