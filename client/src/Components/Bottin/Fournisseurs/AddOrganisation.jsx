import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from "axios";
export default class AddOrganisation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: '', nom_alternatif: '', affiliation: '', local: '', adresse_civique: '', adresse_postale: '', telephone: '', courriel: '', site_web: '', fax: '', type: '', no_client: ''

        };

    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client } = this.state
        const compagnie = { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client }

        axios.post(`${process.env.REACT_APP_API_URL}/organisations`, compagnie)
            .then(res => {
                window.location = '/bottin/fournisseurs'

            })
    }

    render() {
        const compagnie = { 'nom': 'Nom', 'nom_alternatif': 'Nom Alternatif', 'affiliation': 'Affiliation', 'local': 'Local', 'adresse_civique': 'Adresse Civique', 'adresse_postale': 'Adresse Postale', 'telephone': 'Téléphone', 'courriel': 'Courriel', 'site_web': 'Site Web', 'fax': 'No. de Fax', 'type': 'Type', 'no_client': 'Numéro Client' }

        return (
            <div className="nouveau-contact">
                <Form onSubmit={this.handleSubmit}>
                    {Object.keys(compagnie).map((key) => {
                        const item = compagnie[key]
                        return (
                            <Form.Group controlId={key}>
                                <Form.Label>{item}</Form.Label>
                                <Form.Control type="text" placeholder={`${item} de l'organisation`} onChange={this.handleChange} />
                            </Form.Group>
                        )
                    })}
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

            </div>
        )
    }
}