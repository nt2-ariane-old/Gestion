import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSignOutAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <header className={this.props.isFullMode ? 'topbar full' : 'topbar side'}>
                <a className="brand" href='/'>
                    Gestion NT2
                </a>
                <button className='openbtn' onClick={this.props.setFullMode}><FontAwesomeIcon icon={faBars} /></button>
                <div className='menu-options'>
                    <button className='openbtn'><FontAwesomeIcon icon={faEnvelopeOpenText} /></button>
                </div>
                <div className="menu-left">
                    {
                        this.props.user_info &&
                        <div className='menu-user'>
                            Bonjour {this.props.user_info.prenom}
                        </div>
                    }
                    <button className='logout-btn' onClick={this.props.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
                </div>
            </header>
        )
    }
}
