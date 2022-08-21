import React from 'react';
import { Header, Table } from 'semantic-ui-react'
import Navbar from './Navbar'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Log() {
  const [log, setLog] = useState([])
  useEffect(() => {
    const get = async () => {
        let res = await axios.get('http://backend:3000/log')
        const data = res.data
        setLog(data)
    }

    get()
    }
  )
  
  return (
    <div>
      <Navbar item='log'/>
      <div className="content">
            <div className="ui segment mosaico container">
                <Header>
                    Bitácora de Acciones
                </Header>
                
                <Table fixed>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Función</Table.HeaderCell>
                        <Table.HeaderCell>Fecha y Hora</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        log.map((entry, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{entry.func}</Table.Cell>
                                    <Table.Cell>{entry.time}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    </Table.Body>
                </Table>
            </div>
        </div>
    </div>
  )
}

export default Log