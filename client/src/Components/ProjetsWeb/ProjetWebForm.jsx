import React, { Component } from "react";
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { Form, Button } from 'react-bootstrap'
export default class ProjetWebForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            url: '',
            body: '',
            image: null,
            drive: '',
            trello: '',
            github: '',

            direction: [],
            chef: [],
            interne: [],
            externe: [],

            individus: null,
            id: null,
            editMode: false
        }
    }
    componentDidMount = async () => {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            await axios.get(`${process.env.REACT_APP_API_URL}/individus`)
                .then(res => {
                    res = res.data
                    this.setState({ individus: res }, async () => {
                        await axios.get(`${process.env.REACT_APP_API_URL}/projets_web/${id}`)
                            .then(res => {
                                res = res.data.projet

                                let direction = res.direction.map((x) => this.state.individus.find(y => y._id === x));
                                let chef = res.chef.map((x) => this.state.individus.find(y => y._id === x));
                                let interne = res.interne.map((x) => this.state.individus.find(y => y._id === x));
                                let externe = res.externe.map((x) => this.state.individus.find(y => y._id === x));

                                this.setState({
                                    id: res._id,
                                    title: res.title,
                                    url: res.url,
                                    body: res.body,

                                    drive: res.drive,
                                    trello: res.trello,
                                    github: res.github,

                                    direction: direction,
                                    chef: chef,
                                    interne: interne,
                                    externe: externe,

                                    editMode: true
                                })
                            })
                            .catch((e) => console.log(e))
                    })

                })
                .catch((e) => console.log(e))

        }

    }
    handleSubmit = async e => {
        e.preventDefault()
        const { title, url, drive, trello, github, body, image } = this.state
        let { direction, chef, interne, externe } = this.state
        direction = direction.map((individu) => individu._id)
        interne = interne.map((individu) => individu._id)
        externe = externe.map((individu) => individu._id)
        chef = chef.map((individu) => individu._id)
        const projet = { title, url, drive, trello, github, direction, chef, interne, externe, body, image }
        if (this.state.editMode)
            this.handleUpdate(projet)
        else
            this.handleAdd(projet)
    }
    handleAdd = async projet => {
        await axios.post(`${process.env.REACT_APP_API_URL}/projets_web`, projet)
            .then(res => {
                res = res.data
                window.location = '/projets/web'
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log('Request')
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }
    handleUpdate = async projet => {
        await axios.patch(`${process.env.REACT_APP_API_URL}/projets_web/${this.state.id}`, projet)
            .then(res => {
                res = res.data
                window.location = '/projets/web'
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log('Request')
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }
    handleDelete = async e => {
        e.preventDefault()
        if (this.state.id) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/projets_web/${this.state.id}`)
                .then(res => {
                    res = res.data
                    window.location = '/projets/web'
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log('Request')
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
        }
    }
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }
    setSelected = (e, type) => {
        this.setState({ [type]: e })
    }
    render() {
        const { editMode, title, url, body, image, drive, github, trello, individus, direction, chef, interne, externe } = this.state
        return (
            <div className='projets-web-ajout'>
                <h1>{editMode ? `Modification de ${title}` : `Ajout d\'un nouveau projet : ${title}`}</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" onChange={this.handleChange} defaultValue={title} />
                    </Form.Group>
                    <Form.Group controlId="url">
                        <Form.Label>Url</Form.Label>
                        <Form.Control type="text" placeholder="Url" onChange={this.handleChange} defaultValue={url} />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image du Projet</Form.Label>
                        <Form.Control type="file" placeholder="Image du projet" onChange={this.handleChange} defaultValue={image} />
                    </Form.Group>
                    <Form.Group controlId="body">
                        <Form.Label>Informations</Form.Label>
                        <Form.Control as="textarea" placeholder="Informations" rows="5" onChange={this.handleChange} defaultValue={body} />
                    </Form.Group>
                    <Form.Group controlId="drive">
                        <Form.Label>Drive</Form.Label>
                        <Form.Control type="text" placeholder="Drive" onChange={this.handleChange} defaultValue={drive} />
                    </Form.Group>
                    <Form.Group controlId="github">
                        <Form.Label>Github</Form.Label>
                        <Form.Control type="text" placeholder="Github" onChange={this.handleChange} defaultValue={github} />
                    </Form.Group>
                    <Form.Group controlId="trello">
                        <Form.Label>Trello</Form.Label>
                        <Form.Control type="text" placeholder="Trello" onChange={this.handleChange} defaultValue={trello} />
                    </Form.Group>

                    <Form.Group controlId="direction">
                        <Form.Label>Direction du Projet</Form.Label>
                        <Typeahead
                            id="direction"
                            labelKey="prenom"
                            multiple={true}
                            onChange={(e) => this.setSelected(e, 'direction')}
                            options={individus}
                            placeholder="Direction"
                            selected={direction}
                        />
                    </Form.Group>
                    <Form.Group controlId="chef">
                        <Form.Label>Chef du projet</Form.Label>
                        <Typeahead
                            id="chef"
                            labelKey="prenom"
                            multiple={true}
                            onChange={(e) => this.setSelected(e, 'chef')}
                            options={individus}
                            placeholder="Chef du Projet"
                            selected={chef}
                        />
                    </Form.Group>
                    <Form.Group controlId="interne">
                        <Form.Label>Équipe Interne</Form.Label>
                        <Typeahead
                            id="interne"
                            labelKey="prenom"
                            multiple={true}
                            onChange={(e) => this.setSelected(e, 'interne')}
                            options={individus}
                            placeholder="Équipe Interne"
                            selected={interne}
                        />
                    </Form.Group>
                    <Form.Group controlId="externe">
                        <Form.Label>Équipe Externe</Form.Label>
                        <Typeahead
                            id="externe"
                            labelKey="prenom"
                            multiple={true}
                            onChange={(e) => this.setSelected(e, 'externe')}
                            options={individus}
                            placeholder="Équipe Externe"
                            selected={externe}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editMode ? 'Modifier' : 'Ajouter'}
                    </Button>
                    {editMode &&
                        <Button variant="danger" type="button" onClick={this.handleDelete}>
                            Supprimer
                        </Button>
                    }
                </Form>

            </div>
        )
    }
}