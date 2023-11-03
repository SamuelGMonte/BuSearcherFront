import { useEffect, useState, useRef } from 'react'
import './App.css'
import React from 'react';
import { ChakraProvider, position } from '@chakra-ui/react'
import { CardApiLinha } from './components/cardLinha/cardApiLinha.tsx'
import { CardApiParada } from './components/cardParada/cardApiParada.tsx'
import { useApiDataNumber } from './hooks/useApiDataNumber.ts';
import { useApiDataName } from './hooks/useApiDataName.ts';
import ShowMap from './components/mapa/showMap.tsx'
import { LinhaParada } from './components/cardParada/cardApiParada.tsx';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapComponent } from './hooks/MapComponent.tsx'

function App() {
  const [param, setParam] = useState('');
  const [termosBusca, setTermosBusca] = useState('');
  const { data: numberData, isLoading: numberIsLoading, isError: numberIsError, error: numberError } = useApiDataNumber(parseInt(param, 10));
  const { data: nameData, isLoading: nameIsLoading, isError: nameIsError, error: nameError} = useApiDataName(termosBusca);
  const { px: longitude, py: latitude } = useApiDataName('');
  const pyArray: number[] = latitude;
  const pxArray: number[] = longitude

  const teste: LinhaParada[] = pyArray.map((py, index) => ({
    py,
    px: pxArray[index],
  }));

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermosBusca(e.target.value);
  };

  MapComponent

  return (
  <ChakraProvider>
  <div className="container">

    <div className="busca">
      <div className="buscaCampo">
        <h1>Busca por linha</h1>
          <input
          type="number"
          value={param}
          onChange={handleChangeNumber}
          placeholder="Coloque o numero da linha: "
        />
      </div>

      <div className="buscaCampo">
      <h1>Busca por nome</h1>
        <input
          type="text"
          value={termosBusca}
          onChange={handleChangeName}
          placeholder="Coloque o nome da linha: "
        />
      </div>
    </div>

       

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
                tp={apiDataLinha.tp}
                />
              ))
            )
            ): null}     
        </div>
        
          <div className="card-grid">
          {termosBusca ? (
            nameIsLoading ? (
              <p>Carregando...</p>
            ) : nameIsError ? (
              <p>Erro: {nameError instanceof Error ? nameError.message : "Um erro ocorreu."}</p>
            ) : (
              nameData?.map((apiDataNome, index) => (
                <div key={index}>
                  
                    <CardApiParada
                      np={apiDataNome.np}
                      ed={apiDataNome.ed}
                      py={apiDataNome.py}
                      px={apiDataNome.px}
                    />
                   
                </div>
              ))
              )
              ) : null}
          
              
            

          </div>

      
          {/* <div className="map-container-nome">
            {nameData ? (
            ) : null}
          </div> */}
     
  
          <h1>Mapa</h1>
          
        
         
  </div>
    </ChakraProvider>
     

  )
}

export default App
