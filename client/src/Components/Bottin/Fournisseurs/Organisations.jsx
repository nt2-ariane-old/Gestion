import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap'
import AddContact from "./AddOrganisation";
import ContactList from "./OrganisationsList";
export default class Organisations extends Component {
    render() {

        return (
            <div className="organisations">
                <Tabs defaultActiveKey="liste" id="bottin">
                    <Tab eventKey="liste" title="Liste">
                        <ContactList />
                    </Tab>
                    <Tab eventKey="newOrg" title="Ajouter">
                        <AddContact />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}