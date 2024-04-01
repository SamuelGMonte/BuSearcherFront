import { useQuery } from 'react-query';
import { ApiResponse, VeiculoStatus } from '../../components/cardQtd/cardApiQtd';
import { useEffect, useState } from 'react';

const API_URL = 'https://busearcher.rj.r.appspot.com/posicao';

const smoothValue = (currentValue: number, targetValue: number, smoothing = 0.1) => {
    return currentValue + (targetValue - currentValue) * smoothing;
};

const fetchDataName = async (): Promise<ApiResponse> => {
  const response = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (!response.ok) {
      throw new Error('Falha na busca de dados');
    }
  } catch (error: any) {
    throw new Error(`Error while fetching data: ${error.message}`);
  }

  const data = await response.json();
  return data;
};


export function useApiDataQtd() {
    const [forceUpdate, setForceUpdate] = useState(false);
    
    const query = useQuery('api-data-name', {
        queryFn: fetchDataName,
        retry: 2,
        enabled: forceUpdate,
    });

  const hr = query.data?.hr || '';
  const veiculoStatusList: VeiculoStatus[] = query.data?.l?.[0]?.vs || [];
  const taList = veiculoStatusList.map((veiculo) => veiculo.ta || '');
  const pxList = veiculoStatusList.map((veiculo) => veiculo.px || 0);
  const pyList = veiculoStatusList.map((veiculo) => veiculo.py || 0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setForceUpdate((prev) => !prev);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return {
    ...query,
    hr,
    taList,
    pxList: pxList.map((value, index) => smoothValue(value, pxList[index])),
    pyList: pyList.map((value, index) => smoothValue(value, pyList[index])),
  };
}
