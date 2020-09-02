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
        console.log(this.state.id)
        if (this.state.id) {
            axios.get(`${process.env.REACT_APP_API_URL}/biblio/${this.state.id}`)
                .then((res) => {
                    res = res.data
                    console.log(res)
                    const { titre, auteur, date_sortie, editeur, lieu_publication, type_publication, lang, categorie, nb_pages, volume, numero, resume, etat, localisation } = res
                    this.setState({ titre, auteur, date_sortie, editeur, lieu_publication, type_publication, lang, categorie, nb_pages, volume, numero, resume, etat, localisation })
                })
                .catch(e => console.log(e))
        }
        else {
            window.location = '/bibliotheque'
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
        const fields = { 'auteur': 'Auteur', 'date_sortie': 'Date de sortie', 'editeur': 'Editeur', 'lieu_publication': 'Lieu de publication', 'type_publication': 'Type de publication', 'lang': 'Langue', 'categorie': 'Catégorie', 'nb_pages': "Nombre de pages", 'volume': 'Volume', 'numero': 'Numero', 'etat': 'État', 'localisation': 'Localisation' }
        console.log(this.state.auteur)
        return (
            <div className='bibliotheque-document-infos' >
                <div className='bibliotheque-document-infos-header'>
                    <h1>
                        {this.state.titre}
                    </h1>
                </div>
                <div className='bibliotheque-document-infos-body'>
                    {
                        Object.keys(fields).map((key) => {
                            const label = fields[key]
                            const value = this.state[key]
                            return (
                                value &&
                                <div key={key} className='document-info-row'>
                                    <label>{label}</label>
                                    <p>{value}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
}