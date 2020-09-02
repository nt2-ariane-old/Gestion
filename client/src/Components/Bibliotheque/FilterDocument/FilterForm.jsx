/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
export default function Filters(props) {
    const [titre, setTitre] = useState('');
    const handleChange = (e) => {
        setTitre(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${process.env.REACT_APP_API_URL}/biblio/${props.type}`, { titre: titre })
            .then((res) => {
                console.log(res)
                props.callback()
            })
    }
    return (
        <div className='biblio-filters-form'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='titre'>
                    <Form.Label>Titre</Form.Label>
                    <Form.Control type='text' placeholder='Titre' onChange={handleChange} />
                </Form.Group>
                <Button type='submit'>Ajouter</Button>
            </Form>
        </div>
    )
}

