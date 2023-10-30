import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CardApiLinha } from './components/cardLinha/cardApiLinha.tsx'
import { CardApiParada } from './components/cardParada/cardApiParada.tsx'
import { useApiDataNumber } from './hooks/useApiDataNumber.ts';
import { useApiDataName } from './hooks/useApiDataName.ts';

function App() {
  const [param, setParam] = useState('');
  const [termosBusca, setTermosBusca] = useState('');
  const { data: numberData, isLoading: numberIsLoading, isError: numberIsError, error: numberError } = useApiDataNumber(parseInt(param, 10));
  const { data: nameData, isLoading: nameIsLoading, isError: nameIsError, error: nameError } = useApiDataName(termosBusca);

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermosBusca(e.target.value);
  };

  return (
    <ChakraProvider>
      <div className="container">
        <h1>Busca por linha</h1>
          <input
          type="number"
          value={param}
          onChange={handleChangeNumber}
          placeholder="Coloque o numero da linha: "
        />
        <div className="card-grid">
          {param ? (
          numberIsLoading ? (
            <p>Carregando...</p>
          ) : numberIsError ? (
            <p>Erro: {numberError instanceof Error ? numberError.message : "Um erro ocorreu."}</p>
          ) : (
            numberData?.map((apiDataLinha) => (
              <CardApiLinha 
              cl={apiDataLinha.cl}
              lt={apiDataLinha.lt} 
              ts={apiDataLinha.ts} 
              tp={apiDataLinha.tp} />
            ))
          )
          ): null}     
          
       
        </div>

        <h1>Busca por nome</h1>
        <input
          type="text"
          value={termosBusca}
          onChange={handleChangeName}
          placeholder="Coloque o nome da linha: "
        />
         <div className="card-grid">
          {nameIsLoading ? (
            <p>Carregando...</p>
          ) : nameIsError ? (
            <p>Erro: {nameError instanceof Error ? nameError.message : "Um erro ocorreu."}</p>
          ) : (
            nameData?.map((apiDataNome) => (
              <CardApiParada 
              np={apiDataNome.np} 
              ed={apiDataNome.ed} 
              py={apiDataNome.py}
              px={apiDataNome.px} />
            ))
          )}
        </div>
      </div>
    </ChakraProvider>
     

  )
}

export default App
