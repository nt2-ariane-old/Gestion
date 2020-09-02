import React, { Component } from 'react'

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons'

import EventShow from './EventShow'
import EventForm from './EventForm'

var frLocale = require('moment/locale/fr');
moment.locale('fr', frLocale);

export default class EventPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateMode: false
        }
    }
    deleteEvent = () => {
        this.props.closeEvent();
    }
    updateEvent = () => {
        this.setState({ updateMode: !this.state.updateMode })
    }
    render() {
        console.log(this.props.event)
        return (
            <div className='event-popup'>
                <div className='event-popup-header'>
                    <button onClick={this.updateEvent}>{this.state.updateMode ? <FontAwesomeIcon icon={faInfo} /> : <FontAwesomeIcon icon={faPencilAlt} />}</button>
                    <button onClick={this.deleteEvent}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    <button onClick={this.props.closeEvent}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
                <div className='event-popup-body'>
                    <div className='event-popup-infos'>
                        {
                            this.state.updateMode ?
                                <EventForm event={this.props.event} />
                                :
                                <EventShow event={this.props.event} />
                        }
                    </div>
                </div>

            </div>
        )
    }
}