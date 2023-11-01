import { useEffect, useState, useRef } from 'react'
import './App.css'
import React from 'react';
import { ChakraProvider, position } from '@chakra-ui/react'
import { CardApiLinha } from './components/cardLinha/cardApiLinha.tsx'
import { CardApiParada } from './components/cardParada/cardApiParada.tsx'
import { useApiDataNumber } from './hooks/useApiDataNumber.ts';
import { useApiDataName } from './hooks/useApiDataName.ts';
import  MapWithMarker  from './components/mapa/showMap.tsx'
import { LinhaParada } from './components/cardParada/cardApiParada.tsx';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FlyMapTo } from './hooks/FlyMapTo.tsx';

function App() {
  const [param, setParam] = useState('');
  const [termosBusca, setTermosBusca] = useState('');

  const { data: numberData, isLoading: numberIsLoading, isError: numberIsError, error: numberError } = useApiDataNumber(parseInt(param, 10));
  const { data: nameData, isLoading: nameIsLoading, isError: nameIsError, error: nameError } = useApiDataName(termosBusca);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [coordinates, setCoords] = useState<number[]>([0, 0]);
  
  const handleCardClick = (newLatitude: number, newLongitude: number) => {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
  };

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

    

        <div className="row">

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
                    onCardClick={() => handleCardClick(apiDataNome.py, apiDataNome.px)}
                    />
                  
                  </div>
                
                ))
              
                )
            ): null}
      
          
          <h1>Mapa</h1>
          
          
          {termosBusca && nameData ? (
             <div className="map-container">
               <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '500px', width: '500px' }}>
                <MapWithMarker paradas={nameData} center={[latitude, longitude]} coordinates={[latitude, longitude]} />
              </MapContainer>
            </div>
          ): null}
          </div>
        </div>
      </div>
    </ChakraProvider>
     

  )
}

export default App
