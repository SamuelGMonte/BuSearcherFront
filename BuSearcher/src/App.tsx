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
import ShowMapOnly from './components/mapa/showMapOnly.tsx';
import { Map } from 'leaflet';
import { CardList } from './components/cardParada/CardList.tsx';

function App() {
  const [param, setParam] = useState('');
  const [termosBusca, setTermosBusca] = useState('');
  // const { data: numberData, isLoading: numberIsLoading, isError: numberIsError, error: numberError } = useApiDataNumber(parseInt(param, 10));
  const { data: nameData, isLoading: nameIsLoading, isError: nameIsError, error: nameError} = useApiDataName(termosBusca);
  // const handleCardClick = useZoom();
  // const { px: longitude, py: latitude } = useApiDataName('');
  // const pyArray: number[] = latitude;
  // const pxArray: number[] = longitude

  // const teste: LinhaParada[] = pyArray.map((py, index) => ({
  //   ed: '',
  //   np: 0,
  //   py,
  //   px: pxArray[index],
  // }));

  

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermosBusca(e.target.value);
  };

  

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

       

          {/* <div className="card-grid1">
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
        </div> */}
        
        <div className="card-grid2">
        {termosBusca ? (
          nameIsLoading ? (
            <p>Carregando...</p>
          ) : nameIsError ? (
            <p>Erro: {nameError instanceof Error ? nameError.message : "Um erro ocorreu."}</p>
          ) : (
  
            nameData?.map(({ np, ed, py, px }) => (
              <CardApiParada
                key={np} 
                np={np}
                ed={ed}
                py={py}
                px={px}
              />
            ))
          )
        ) : null}
      </div>




        
     
            <div className="map-container">
            <MapComponent />

            </div>
      </div>
  
     
  
          <h1>Mapa</h1>

         
    </ChakraProvider>
     

  )
}

export default App
