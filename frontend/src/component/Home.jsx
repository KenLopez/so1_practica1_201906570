import { useEffect } from "react";
import { Header, Label, Table } from "semantic-ui-react"
import Navbar from "./Navbar";

function Home() {
    return (
        <>
            <Navbar item='home'/>
            <div className="content">
                <div className="ui segment mosaico container">
                    <Header>Vehículos Registrados</Header>
                    <Table celled>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Placa</Table.HeaderCell>
                            <Table.HeaderCell>Marca</Table.HeaderCell>
                            <Table.HeaderCell>Modelo</Table.HeaderCell>
                            <Table.HeaderCell>Serie</Table.HeaderCell>
                            <Table.HeaderCell>Color</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>HOla</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Home