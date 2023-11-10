import { useEffect, useState, useRef } from 'react'
import './App.css'
import React from 'react';
import { ChakraProvider, position } from '@chakra-ui/react'
import { CardApiParada, LinhaParada } from './components/cardParada/cardApiParada.tsx'
import 'leaflet/dist/leaflet.css';
import { useApiDataName } from './hooks/nomeParadaRequest/useApiDataName.ts'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapSaver } from './hooks/MapSaver.tsx';
import { useApiDataNameHour } from './hooks/horaOnibusRequest/useApiHour.ts'
import * as L from 'leaflet';
import { MarkerClusterGroup, MarkerClusterGroupOptions } from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function App() {
  const [termosBusca, setTermosBusca] = useState('');
  const { data: nameData, isLoading: nameIsLoading, isError: nameIsError, error: nameError} = useApiDataName(termosBusca);
  const { data: dataHour } = useApiDataNameHour();
  const [map, setMap] = useState('');
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermosBusca(e.target.value);
  }



  return (
  <ChakraProvider>
  <section className="container">

    <div className="busca">
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
        <MarkerClusterGroup maxClusterRadius={20} zoomToBoundsOnClick={false} showCoverageOnHover={false}>
            {dataHour?.l?.slice(0, 30).map((item) =>
              item?.vs?.map((veiculo, veiculoIndex) => (
                <Marker
                  key={veiculoIndex}
                  position={[veiculo.py, veiculo.px]}
                  icon={L.divIcon({
                    className: 'custom-marker',
                    html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>',
                  })}
                >
                  <Popup>{item.c}</Popup>
                </Marker>
              ))
            )}
        </MarkerClusterGroup>

            
        </MapContainer>
        
        {termosBusca ? (
          nameIsLoading ? (
            <p>Carregando...</p>
          ) : nameIsError ? (
            <p>Erro: {nameError instanceof Error ? nameError.message : "Um erro ocorreu."}</p>
          ) : (
            nameData?.map(({ np, ed, py, px}, index) => (
              <CardApiParada
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
