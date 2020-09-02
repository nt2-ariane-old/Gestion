import React, { Component } from "react";

import { Tabs, Tab } from 'react-bootstrap'

import Contacts from './Contacts/Contacts'
import Organisations from './Fournisseurs/Organisations'

export default class Bottin extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="employes" id="bottin">
                    <Tab eventKey="employes" title="Employes">
                        <Contacts path='/bottin/employes' type='employes' isAdmin={this.props.isAdmin} />
                    </Tab>
                    <Tab eventKey="contacts" title="Contacts">
                        <Contacts path='/bottin/contacts' type='contacts' isAdmin={this.props.isAdmin}/>
                    </Tab>
                    <Tab eventKey="fournisseurs" title="Fournisseurs" >
                        <Organisations isAdmin={this.props.isAdmin}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}