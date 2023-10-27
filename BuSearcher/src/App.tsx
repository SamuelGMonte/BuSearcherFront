import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import {apiData} from './interface/apiData.ts'

function App() {
  const data: apiData[] = [];
  return (
    <ChakraProvider>
      <div className="div">
        <h1>Busca por linha</h1>
        <div className="card-grid">
          {data.map(apiData => <Card cl={apiData.cl} lt={apiData.lt} sl={apiData.sl}/>)}
        </div>
      </div>
    </ChakraProvider>
     

  )
}

export default App
