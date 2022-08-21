import React from 'react';
import { useEffect, useState } from "react";
import { Button, Confirm, Form, Header, Icon, Modal, Table } from "semantic-ui-react"
import Navbar from "./Navbar";
import axios from "axios";
import Formulario from "./Formulario";

function Home() {
    const [vehicles, setVehicles] = useState([])
    const [display, setDisplay] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [selected, setSelected] = useState(null)
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [color, setColor] = useState('')
    
    const getData = () => {
        const get = async () => {
            let res = await axios.get('http://localhost:3000/vehicle')
            const data = res.data
            setVehicles(data)
            setDisplay(data)
        }

        get()
    }
    useEffect(getData, [])

    const openModal = (data, open) => {
        setSelected(data)
        open(true)
    }

    const openDeleteModal = (data) => {
        setSelected(data)
        setOpenDelete(true)
    }

    const filter = (set, value) => {
        let filtered = []
        Object.assign(filtered, vehicles)
        set(value)
        if(set === setMarca){
            if(value){
                filtered = filtered.filter(item => item.marca.toUpperCase().includes(value.toUpperCase()))
            }
        }else{
            if(marca){
                filtered = filtered.filter(item => item.marca.toUpperCase().includes(marca.toUpperCase()))
            }
        }
        
        if(set === setModelo){
            if(value){
                filtered = filtered.filter(item => item.modelo.toUpperCase().includes(value.toUpperCase()))
            }
        }else{
            if(modelo){
                filtered = filtered.filter(item => item.modelo.toUpperCase().includes(modelo.toUpperCase()))
            }
        }

        if(set === setColor){
            if(value){
                filtered = filtered.filter(item => item.color.toUpperCase().includes(value.toUpperCase()))
            }
        }else{
            if(color){
                filtered = filtered.filter(item => item.color.toUpperCase().includes(color.toUpperCase()))
            }
        }
        setDisplay(filtered)
    }

    const submitEdit = (data) => {
        const editar = async () =>{
          await axios.put('http://localhost:3000/vehicle', data)
          getData()
          setOpenEdit(false)
        }
        editar()
    }

    const submitRegister = (data) => {
        const registrar = async () =>{
          await axios.post('http://localhost:3000/vehicle', data)
          getData()
          setOpenRegister(false)
        }
        registrar()
    }

    const remove = () => {
        const borrar = async () => {
            await axios.delete(`http://localhost:3000/vehicle/${selected.ID}`)
            getData()
            setOpenDelete(false)
        }
        borrar()
    }

    return (
        <div>
            <Navbar item='home'/>
            <div className="content">
                <div className="ui segment mosaico container">
                    <Header>Filtros</Header>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                label='Marca'
                                control='input'
                                placeholder='Marca...'
                                onChange={(e) => filter(setMarca, e.target.value)}
                            />
                            <Form.Field
                                label='Modelo'
                                control='input'
                                placeholder='Modelo...'
                                onChange={(e) => filter(setModelo, e.target.value)}
                            />
                            <Form.Field
                                label='Color'
                                control='input'
                                placeholder='Color...'
                                onChange={(e) => filter(setColor, e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div className="ui segment mosaico container">
                    <Header floated="left">
                        Vehículos Registrados
                    </Header>
                    <Button onClick={() => openModal(null, setOpenRegister)} floated='right' primary icon>
                        <Icon name="plus"/>
                    </Button>
                    
                    <Table fixed>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Placa</Table.HeaderCell>
                            <Table.HeaderCell>Marca</Table.HeaderCell>
                            <Table.HeaderCell>Modelo</Table.HeaderCell>
                            <Table.HeaderCell>Serie</Table.HeaderCell>
                            <Table.HeaderCell>Color</Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>Acciones</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {
                            display.map((v, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{v.placa}</Table.Cell>
                                        <Table.Cell>{v.marca}</Table.Cell>
                                        <Table.Cell>{v.modelo}</Table.Cell>
                                        <Table.Cell>{v.serie}</Table.Cell>
                                        <Table.Cell>{v.color}</Table.Cell>
                                        <Table.Cell>
                                            <Button 
                                                fluid 
                                                color="grey" 
                                                animated='vertical'
                                                onClick={() => openModal(v, setOpenEdit)}
                                            >
                                                <Button.Content hidden>Editar</Button.Content>
                                                <Button.Content visible>
                                                <Icon name="edit"/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button 
                                                fluid 
                                                color="red" 
                                                animated='vertical'
                                                onClick={() => openDeleteModal(v)}
                                            >
                                                <Button.Content hidden>Eliminar</Button.Content>
                                                <Button.Content visible>
                                                <Icon name="trash"/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <Modal
                onClose={() => setOpenEdit(false)}
                onOpen={() => setOpenEdit(true)}
                open={openEdit}
            >
            <Modal.Header>
                Editar Vehículo
                <Button color='red' onClick={() => setOpenEdit(false)} floated='right' icon inverted>
                    <Icon name="x"/>
                </Button>
            </Modal.Header>
            <Modal.Content>
                <Formulario data={selected} submit={submitEdit} button='Editar'/>
            </Modal.Content>
            </Modal>
            <Modal
                onClose={() => setOpenRegister(false)}
                onOpen={() => setOpenRegister(true)}
                open={openRegister}
            >
            <Modal.Header>
                Registrar Vehículo
                <Button color='red' onClick={() => setOpenRegister(false)} floated='right' icon inverted>
                    <Icon name="x"/>
                </Button>
            </Modal.Header>
            <Modal.Content>
                <Formulario submit={submitRegister} button='Registrar'/>
            </Modal.Content>
            </Modal>
            <Confirm
                header="Eliminar Vehículo"
                open={openDelete}
                onCancel={() => setOpenDelete(false)}
                onConfirm={() => remove()}
                content="¿Está seguro de borrar este vehículo permanentemente?"
                cancelButton="Cancelar"
                confirmButton="Eliminar"
            />
        </div>
    )
}

export default Home