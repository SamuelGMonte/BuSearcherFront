import { LinhaData } from "../../components/LinhaData";
import { useQuery } from 'react-query'; 
const API_URL = 'https://busearcher.rj.r.appspot.com/linhas';


const fetchDataNumber = async (param: number): Promise<LinhaData[]> => {
    const response = await fetch(API_URL + `?param=${param}`, {
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

export function useApiDataNumber(param: number) {
    const query = useQuery(['api-data-number', param], {
        queryFn: () => fetchDataNumber(param),
        retry: 2,
      });

    return{
        ...query,
        data: query.data,
        
    }
}