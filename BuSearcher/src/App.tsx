import { useEffect, useState, useRef } from 'react'
import './App.css'
import React from 'react';
import { ChakraProvider, position } from '@chakra-ui/react'
import { CardApiParada, LinhaDataLinhaParada, LinhaParada } from './components/cardParada/cardApiParada.tsx'
import { CardApiLinha, LinhaData } from './components/cardLinha/cardApiLinha.tsx';
import { useApiDataName } from './hooks/linhaParadaRequest/useApiDataName.ts';
import { useApiDataNumber } from './hooks/nomeParadaRequest/useApiDataNumber.ts';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapSaver } from './hooks/MapSaver.tsx';


function App() {
  const [param, setParam] = useState('');
  const [termosBusca, setTermosBusca] = useState('');
  const { data: numberData, isLoading: numberIsLoading, isError: numberIsError, error: numberError } = useApiDataNumber(parseInt(param, 10));
  const { data: nameData, isLoading: nameIsLoading, isError: nameIsError, error: nameError} = useApiDataName(termosBusca);
  // const { px: longitude, py: latitude } = useApiDataName('');
  // const pyArray: number[] = latitude;
  // const pxArray: number[] = longitude
  const [map, setMap] = useState('');
  

  const combinedData: (LinhaParada | LinhaData)[] = [nameData, numberData].flat();

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
  <section className="container">

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

          <div className="card-grid1">
            {param ? (
            numberIsLoading ? (
              <p>Carregando...</p>
            ) : numberIsError ? (
              <p>Erro: {numberError instanceof Error ? numberError.message : "Um erro ocorreu."}</p>
            ) : (
              numberData?.map(({cl, lt, tp, ts}, index) => (
                <CardApiLinha 
                key={index}
                cl={cl}
                lt={lt} 
                ts={ts} 
                tp={tp}
                />
              ))
            )
            ): null}     
        </div>
        
        
        <div className="card-grid2">
        <MapContainer center={[0, 0]} zoom={1}>
            <MapSaver setMap={setMap} /> 
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {nameData?.map((item, index) =>
              <Marker key={index} position={[item.py, item.px]}>
                <Popup>
                {item.np}
                </Popup>
              </Marker>
            )}
        </MapContainer>
        
        {termosBusca ? (
          nameIsLoading ? (
            <p>Carregando...</p>
          ) : nameIsError ? (
            <p>Erro: {nameError instanceof Error ? nameError.message : "Um erro ocorreu."}</p>
          ) : (
            flattenedData?.map(({ np, ed, py, px, cl, lt, tp, ts }, index) => (
              <CardApiParada
                cl={cl}
                lt={lt}
                tp={tp}
                ts={ts}
                key={index} 
                np={np}
                ed={ed}
                py={py}
                px={px}
                map={map}
              />
            ))
          )
        ) : null}
        
      </div>

          <h1>Mapa</h1>
      </section>
  
     
  

         
    </ChakraProvider>
     

  )
}

export default App
