import { useState } from "react"
import { Button, Form } from "semantic-ui-react"

function Formulario(props) {
    const [placa, setPlaca] = useState(props.data?.placa || '')
    const [marca, setMarca] = useState(props.data?.marca || '')
    const [modelo, setModelo] = useState(props.data?.modelo || '')
    const [serie, setSerie] = useState(props.data?.serie || '')
    const [color, setColor] = useState(props.data?.color || '')

    const submit = () => {
        const data = {
            ID: props.data?.ID || null,
            placa: placa,
            marca: marca,
            modelo: modelo,
            serie: serie,
            color: color
        }
        props.submit(data)
    }


    return (
        <Form onSubmit={() => submit()}>
            <Form.Field
                label='Placa'
                control='input'
                placeholder='Placa...'
                onChange={(e) => setPlaca(e.target.value)}
                value={placa}
                required
            />
            <Form.Field
                label='Marca'
                control='input'
                placeholder='Marca...'
                onChange={(e) => setMarca(e.target.value)}
                value={marca}
                required
            />
            <Form.Field
                label='Modelo'
                control='input'
                placeholder='Modelo...'
                onChange={(e) => setModelo(e.target.value)}
                value={modelo}
                required
            />
            <Form.Field
                label='Serie'
                control='input'
                placeholder='Serie...'
                onChange={(e) => setSerie(e.target.value)}
                value={serie}
                required
            />
            <Form.Field
                label='Color'
                control='input'
                placeholder='Color...'
                onChange={(e) => setColor(e.target.value)}
                value={color}
                required
            />
            <Button type='submit' className='submit' secondary>{props.button}</Button>
        </Form>
    )
}

export default Formulario