import React, { useEffect } from 'react'
import '../css/General.css'
import { Button, Checkbox, Container, Form } from 'semantic-ui-react'
import Navbar from './Navbar'

function Registro() {
  return (
    <>
      <Navbar item='registro'/>
      <div className="content">
          <div className="ui segment mosaico container">
            <Form>
              <Form.Field>
                <label>Placa</label>
                <input placeholder='Placa...' />
              </Form.Field>
              <Form.Field>
                <label>Marca</label>
                <input placeholder='Marca...' />
              </Form.Field>
              <Form.Field>
                <label>Modelo</label>
                <input placeholder='Modelo...' />
              </Form.Field>
              <Form.Field>
                <label>Serie</label>
                <input placeholder='Serie...' />
              </Form.Field>
              <Form.Field>
                <label>Color</label>
                <input placeholder='Color...' />
              </Form.Field>
              <Button type='submit' className='submit' secondary>Registrar</Button>
            </Form>
          </div>
      </div>
    </>
  )
}

export default Registro