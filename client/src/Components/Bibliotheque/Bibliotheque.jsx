/*eslint-disable*/
import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faToolbox } from '@fortawesome/free-solid-svg-icons'

import BiblioNav from './BiblioNav'
import Documents from './InfoDocument/Documents'
export default class Bibliotheque extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`bibliotheque ${this.props.isAdmin && 'admin'}`}>
                {this.props.isAdmin &&
                    <div className='admin-options'>
                        <a className='option' href='/bibliotheque/filtres'><FontAwesomeIcon icon={faToolbox} /> Modifier les filtres</a>
                        <a className='option' href='/bibliotheque/document/add'>
                            <FontAwesomeIcon icon={faPlus} /> Ajouter document
                        </a>
                    </div>
                }
                <BiblioNav />
                <div className='bibliotheque-content'>
                    <div className='bibliotheque-header'>
                        <h1>Bibliothèque</h1>
                    </div>
                    <div className='bibliotheque-body'>
                        <Documents />
                    </div>
                </div>
            </div>
        )
    }
}