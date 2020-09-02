import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from "axios";

export default class Organisation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdate: false,
            id: this.props.match.params.id,
            isLoading: true,

            nom: '',
            nom_alternatif: '',
            affiliation: '',
            local: '',
            adresse_civique: '',
            adresse_postale: '',
            telephone: '',
            courriel: '',
            site_web: '',
            fax: '',
            type: '',
            no_client: ''

        };

    }
    componentDidMount = async () => {

        axios.get(process.env.REACT_APP_API_URL + '/organisations/' + this.state.id)
            .then(response => {
                const { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client } = response.data

                this.setState({
                    nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client
                }, () => this.setState({ isLoading: false }))

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    handleChange = (event) => {
        event.persist()
        this.setState({ [event.target.id]: event.target.value });

    }
    setUpdate = (e) => {
        this.setState({ isUpdate: !this.state.isUpdate })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client } = this.state
        const compagnie = { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client }


        axios.patch(`${process.env.REACT_APP_API_URL}/organisations/` + this.state.id, compagnie)
            .then(res => {
                this.setState({ 'isUpdate': false })

            })
    }
    handleDelete = (e) => {
        e.preventDefault();


        axios.delete(`${process.env.REACT_APP_API_URL}/organisations/` + this.state.id)
            .then(res => {
                window.location = '/bottin/fournisseurs'
            })
    }


    render() {
        if (!this.state.isLoading) {
            const { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client } = this.state
            const compagnie = { nom, nom_alternatif, affiliation, local, adresse_civique, adresse_postale, telephone, courriel, site_web, fax, type, no_client }
            const compagnieTitle = { 'nom': 'Nom', 'nom_alternatif': 'Nom Alternatif', 'affiliation': 'Affiliation', 'local': 'Local', 'adresse_civique': 'Adresse Civique', 'adresse_postale': 'Adresse Postale', 'telephone': 'Téléphone', 'courriel': 'Courriel', 'site_web': 'Site Web', 'fax': 'No. de Fax', 'type': 'Type', 'no_client': 'Numéro Client' }


            return (
                <div className="fiche-contact">
                    {this.state.isUpdate && this.state.organisation != null ?
                        <Form onSubmit={this.handleSubmit}>
                            {Object.keys(compagnie).map((key) => {
                                const item = compagnieTitle[key]
                                const value = compagnie[key]
                                return (
                                    <Form.Group controlId={key}>
                                        <Form.Label>{item}</Form.Label>
                                        <Form.Control type="text" placeholder={`${item} de l'organisation`} onChange={this.handleChange} defaultValue={value} />
                                    </Form.Group>
                                )
                            })}

                            <Button variant="primary" type="submit">Modifier</Button>
                            <Button type="button" variant="info" onClick={this.setUpdate}>Afficher Fiche</Button>
                            <Button type="button" variant="danger" onClick={this.handleDelete}>Supprimer</Button>
                        </Form>
                        :

                        <div className='organisation-infos'>
                            <h1>{nom}</h1>
                            <ul>
                                {Object.keys(compagnie).map(key =>
                                    <li>{compagnieTitle[key]} : {compagnie[key]} </li>
                                )}
                            </ul>
                            <Button type="button" variant="info" onClick={this.setUpdate}>Mettre à jour</Button>
                            <Button type="button" variant="danger" href='/bottin/fournisseurs'>Retour</Button>
                        </div>



                    }


                </div>
            )
        }
        else {
            return 'loading'
        }
    }
}

