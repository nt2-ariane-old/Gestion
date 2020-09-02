import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from "axios";
export default class AddContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            title: '',
            compagny: '',
            phone: '',
            mail: '',
            prenom: ''
        };

    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            nom: this.state.name,
            titre: this.state.title,
            compagnie: this.state.compagny,
            telephone: this.state.phone,
            courriel: this.state.mail,
            prenom: this.state.prenom
        };

        axios.post(`${process.env.REACT_APP_API_URL}/individus`, user)
            .then(res => {
                window.location = '/bottin'

            })
    }

    render() {

        return (
            <div className="nouveau-contact">

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="prenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" placeholder="Prénom de l'individu" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" placeholder="Nom de l'individu" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Titre de l'individu" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="compagny">
                        <Form.Label>Compagnie</Form.Label>
                        <Form.Control type="text" placeholder="Compagnie de l'individu" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="text" placeholder="Numero de telephone de l'individu" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="mail">
                        <Form.Label>Courriel</Form.Label>
                        <Form.Control type="text" placeholder="Email de l'individu" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="estEmploye">
                        <Form.Label>Est Employé</Form.Label>
                        <Form.Control type="checkbox" placeholder="Est admin" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="estAdmin">
                        <Form.Label>Est Admin</Form.Label>
                        <Form.Control type="checkbox" placeholder="Est admin" onChange={this.handleChange} />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
  </Button>
                </Form>

            </div>
        )
    }
}