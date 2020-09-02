import React, { Component } from 'react'

import moment from 'moment';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Form, Button } from 'react-bootstrap'

import axios from "axios";

import { DateTime } from 'react-datetime-bootstrap';

var frLocale = require('moment/locale/fr');
moment.locale('fr', frLocale);

export default class EventShow extends Component {
    constructor(props) {
        super(props)
        this.state = props.event
        console.log(this.state)
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState(this.props.event)
        }
    }
    componentDidMount = () => {
        // const {} = 
        this.setState(this.props.event)

    }
    handleChange = (event) => {
        event.persist()
        this.setState({ [event.target.id]: event.target.value });
    }

    handleChange = (moment, id) => {
        this.setState({ [id]: moment });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const event = {
            title: this.state.title,
            desc: this.state.compagny,
            start: this.state.phone,
            end: this.state.mail
        };

        let url = process.env.REACT_APP_API_URL + '/events'
        if (this.state.id !== null)
            url += '/' + this.state.id
        console.log(url)
        if (this.state.id) {

            axios.patch(url + '/' + this.state.id, event)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            axios.post(url, event)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    handleDelete = (e) => {
        e.preventDefault();

        let url = process.env.REACT_APP_API_URL + '/events/' + this.state.id

        axios.delete(url)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    // console.log('Response')
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('Request')
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }

    render() {
        return (

            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Titre de l'individu" onChange={this.handleChange} defaultValue={this.state.title} />
                    </Form.Group>
                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <CKEditor
                            id='desc'
                            editor={ClassicEditor}
                            data={this.state.desc}

                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.handleChange(data, 'desc')
                            }}

                        />
                    </Form.Group>
                    <Form.Group controlId="start">
                        <Form.Label>Début</Form.Label>
                        <DateTime value={this.state.start.dateTime} />

                        {/* <DateTimeField id="start" onChange={(x) => this.handleChange(x, 'start')} value={this.state.start.dateTime} /> */}
                    </Form.Group>
                    <Form.Group controlId="end">
                        <Form.Label>Fin</Form.Label>
                        <DateTime value={this.state.end.dateTime} />
                        {/* <DateTimeField id="start" onChange={(x) => this.handleChange(x, 'end')} value={this.state.end.dateTime} /> */}
                    </Form.Group>


                    <Button variant="primary" type="submit">{this.state.id !== null ? 'Modifier' : 'Ajouter'}</Button>
                    {
                        this.state.id !== null &&
                        <Button variant="danger" type="button" onClick={this.handleDelete}>Supprimer</Button>
                    }


                </Form>

            </div>
        )
    }
}