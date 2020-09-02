import React, { Component } from "react";

import axios from "axios";

import EventShow from './EventShow'
import EventForm from './EventForm'

export default class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: '<p></p>',
            end: '',
            start: '',
            id: this.props.match.params.id || null,
            updateMode: true
        };

    }
    componentDidMount = () => {
        console.log(this.state.id)
        if (this.state.id !== null) {
            axios.get(`${process.env.REACT_APP_API_URL}/events/` + this.state.id)
                .then(res => {
                    res = res.data
                    this.setState({
                        title: res.summary || '',
                        desc: res.description || '',
                        end: res.end || null,
                        start: res.start
                    })
                    console.log(this.state)

                })
        }
    }

    render() {
        return (
            <div className="nouveau-contact">
                {
                    this.state.updateMode ?
                        <EventForm event={this.state} />
                        :
                        <EventShow event={this.state} />
                }
            </div>
        )
    }
}