/*eslint-disable*/
import React, { Component } from "react";
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
export default class Bibliotheque extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: this.props.match.params.id ? true : false,
            id: this.props.match.params.id || null,
            titre: "",
            auteur: "",
            date_sortie: "",
            editeur: "",
            lieu_publication: "",
            type_publication: "",
            lang: "",
            categorie: "",
            nb_pages: "",
            volume: "",
            numero: "",
            resume: "",
            etat: "",
            localisation: ""
        }
    }
    componentDidMount = () => {
        if (this.state.id) {
            axios.get(`${process.env.REACT_APP_API_URL}/biblio/document/${this.state.id}`)
                .then((res) => {
                    res = res.data
                    const { titre, auteur, date_sortie, editeur, lieu_publication, type_publication, lang, categorie, nb_pages, volume, numero, resume, etat, localisation } = res
                    this.setState({ titre, auteur, date_sortie, editeur, lieu_publication, type_publication, lang, categorie, nb_pages, volume, numero, resume, etat, localisation })
                })
                .catch(e => console.log(e))
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { titre, auteur, date_sortie, editeur, lieu_publication, type_publication, lang, categorie, nb_pages, volume, numero, resume, etat, localisation } = this.state
        const payload = { titre, auteur, date_sortie, editeur, lieu_publication, type_publication, lang, categorie, nb_pages, volume, numero, resume, etat, localisation }
        console.log(payload)
        if (this.state.editMode) {
            axios
                .patch(`${process.env.REACT_APP_API_URL}/biblio/${this.state.id}`, payload)
                .then((res) => {
                    window.location = '/bibliotheque'
                })
        }
        else {
            axios
                .post(`${process.env.REACT_APP_API_URL}/biblio`, payload)
                .then((res) => {
                    window.location = '/bibliotheque'
                })
        }

    }
    render() {
        const fields = { 'titre': 'Titre', 'auteur': 'Auteur', 'date_sortie': 'Date de sortie', 'editeur': 'Editeur', 'lieu_publication': 'Lieu de publication', 'type_publication': 'Type de publication', 'lang': 'Langue', 'categorie': 'Catégorie', 'nb_pages': "Nombre de pages", 'volume': 'Volume', 'numero': 'Numero', 'etat': 'État', 'localisation': 'Localisation' }
        return (
            <div className='bibliotheque-document-form' >
                <div className='bibliotheque-document-form-header'>
                    <h1>
                        {this.state.editMode ? 'Modifier le document' : 'Ajouter le document'}
                    </h1>
                </div>
                <div className='bibliotheque-document-form-body'>
                    <Form onSubmit={this.handleSubmit}>
                        {
                            Object.keys(fields).map((key) => {
                                let element = fields[key];
                                return (
                                    <Form.Group key={key} controlId={key}>
                                        <Form.Label>{element}</Form.Label>
                                        <Form.Control type='text' placeholder={element} onChange={this.handleChange} defaultValue={this.state[key]} />
                                    </Form.Group>
                                )
                            })
                        }
                        < Form.Group controlId='resume'>
                            <Form.Label>Résumé</Form.Label>
                            <Form.Control as='textarea' rows='5' placeholder='Résumé' onChange={this.handleChange} defaultValue={this.state.resume} />
                        </Form.Group>
                        <Button type='submit'>
                            {this.state.editMode ? 'Modifier' : 'Ajouter'}
                        </Button>

                    </Form>
                </div>
            </div >
        )
    }
}