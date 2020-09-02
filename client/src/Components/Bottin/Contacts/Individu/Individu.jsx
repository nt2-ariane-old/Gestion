import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from "axios";

export default class Individu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdate: true,
            individu: null,
            id: this.props.match.params.id || null
        };

    }
    componentDidMount = async () => {

        axios.get(`${process.env.REACT_APP_API_URL}/individus/${this.state.id}`)
            .then(response => {
                this.setState({
                    individu: response.data.individu
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    handleChange = (event) => {
        event.persist()
        if (this.state.individu !== null) {
            let individu = this.state.individu
            console.log()
            let value = null
            if (event.target.type === 'checkbox') {
                value = event.target.checked
            }
            else {
                value = event.target.value
            }
            console.log(value)
            individu[event.target.id] = value
            console.log(individu)
            this.setState({ "individu": individu });
        }
    }
    setUpdate = (e) => {
        this.setState({ 'isUpdate': !this.state.isUpdate })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const user = this.state.individu

        axios.patch(`${process.env.REACT_APP_API_URL}/individus/` + this.state.id, user)
            .then(res => {
                this.setState({ 'isUpdate': false })

            })
    }
    handleDelete = (e) => {
        e.preventDefault();


        axios.delete(`${process.env.REACT_APP_API_URL}/individus/` + this.state.id)
            .then(res => {
                window.location = '/bottin'
            })
    }


    render() {
        if (this.state.individu !== null) {
            const { prenom, nom, titre, compagnie, courriel, telephone, estAdmin, estEmploye } = this.state.individu;
            console.log(this.state.individu)
            console.log(nom)
            return (
                <div className="fiche-contact">
                    {this.state.isUpdate && this.state.individu != null ?
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="prenom">
                                <Form.Label>Prenom</Form.Label>
                                <Form.Control type="text" placeholder="Prenom de l'individu" onChange={this.handleChange.bind(this)} defaultValue={prenom} />
                            </Form.Group>
                            <Form.Group controlId="nom">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" placeholder="Nom de l'individu" onChange={this.handleChange.bind(this)} defaultValue={nom} />
                            </Form.Group>
                            <Form.Group controlId="titre">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control type="text" placeholder="Titre de l'individu" onChange={this.handleChange.bind(this)} defaultValue={titre} />
                            </Form.Group>
                            <Form.Group controlId="compagnie">
                                <Form.Label>Compagnie</Form.Label>
                                <Form.Control type="text" placeholder="Compagnie de l'individu" onChange={this.handleChange.bind(this)} defaultValue={compagnie} />
                            </Form.Group>
                            <Form.Group controlId="telephone">
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control type="text" placeholder="Numero de telephone de l'individu" onChange={this.handleChange.bind(this)} defaultValue={telephone} />
                            </Form.Group>
                            <Form.Group controlId="courriel">
                                <Form.Label>Courriel</Form.Label>
                                <Form.Control type="text" placeholder="Courriel de l'individu" onChange={this.handleChange.bind(this)} defaultValue={courriel} />
                            </Form.Group>
                            <Form.Group controlId="estEmploye">
                                <Form.Label>Est Employé</Form.Label>
                                <Form.Control type="checkbox" placeholder="Est admin" onChange={this.handleChange} defaultChecked={estEmploye} />
                            </Form.Group>
                            <Form.Group controlId="estAdmin">
                                <Form.Label>Est Admin</Form.Label>
                                <Form.Control type="checkbox" placeholder="Est admin" onChange={this.handleChange} defaultChecked={estAdmin} />
                            </Form.Group>

                            <Button variant="primary" type="submit">Modifier</Button>
                            <Button type="button" variant="info" onClick={this.setUpdate}>Afficher Fiche</Button>
                            <Button type="button" variant="danger" onClick={this.handleDelete}>Supprimer</Button>
                        </Form>
                        :

                        <div className='individu-infos'>
                            <h1>{nom}</h1>
                            <ul>
                                <li>Titre : {titre} </li>
                                <li>Compagnie : {compagnie} </li>
                                <li>Telephone : {telephone} </li>
                                <li>Courriel : {courriel} </li>
                            </ul>
                            <Button type="button" variant="info" onClick={this.setUpdate}>Mettre à jour</Button>
                            <Button type="button" variant="danger" href='/bottin'>Retour</Button>
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