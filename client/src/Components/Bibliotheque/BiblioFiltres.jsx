/*eslint-disable*/
import React from "react";
import { Tabs, Tab } from 'react-bootstrap'

import Filters from './FilterDocument/Filters'

export default function BiblioFiltres(props) {
    return (
        <div className='biblio-filtres'>
            <div className='biblio-filtre-header'>
                <h1>Filtres pour la recherche | Bibliothèque</h1>
            </div>
            <div className='biblio-filtre-body'>
                <Tabs defaultActiveKey="categories" id="uncontrolled-tab-example">
                    <Tab eventKey="categories" title="Catégories">
                        <Filters type='categories' isAdmin={props.isAdmin} />
                    </Tab>
                    <Tab eventKey="annees" title="Années">
                        <Filters type='annees' isAdmin={props.isAdmin} />
                    </Tab>
                    <Tab eventKey="etats" title="États">
                        <Filters type='etats' isAdmin={props.isAdmin} />
                    </Tab>
                    <Tab eventKey="types" title="Types">
                        <Filters type='types' isAdmin={props.isAdmin} />
                    </Tab>
                    <Tab eventKey="langs" title="Langues">
                        <Filters type='langs' isAdmin={props.isAdmin} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

