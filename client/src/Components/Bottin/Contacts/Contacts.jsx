import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faTable, faGripLines } from '@fortawesome/free-solid-svg-icons'

import ContactList from "./ContactList";
export default class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableMode: false,
            lineMode: false
        }
    }
    isTableMode = () => {
        this.setState({ tableMode: !this.state.tableMode, lineMode: false })
    }
    isLineMode = () => {
        this.setState({ tableMode: false, lineMode: !this.state.lineMode })
    }
    render() {
        const { tableMode, lineMode } = this.state
        const { type, path, isAdmin } = this.props
        return (
            <div className={tableMode ? "contacts table" : lineMode ? "contacts line" : "contacts"}>
                <div className='contacts-header'>
                    <button className={lineMode ? 'selected' : ''} onClick={this.isLineMode}><FontAwesomeIcon icon={faGripLines} /></button>
                    <button className={tableMode ? 'selected' : ''} onClick={this.isTableMode}><FontAwesomeIcon icon={faTable} /></button>
                    {
                        isAdmin &&
                        <a href={this.props.path + '/add'}><FontAwesomeIcon icon={faUserPlus} /></a>
                    }
                </div>
                <ContactList tableMode={tableMode} lineMode={lineMode} isAdmin={isAdmin} type={type} />
            </div>
        )
    }
}