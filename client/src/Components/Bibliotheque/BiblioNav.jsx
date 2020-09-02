/*eslint-disable*/
import React, { Component } from "react";
import axios from 'axios'

export default class Bibliotheque extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: [],
            langs: [],
            etats: [],
            categories: [],
            annees: []
        }
    }
    componentDidMount = async () => {
        const fields = ['types', 'langs', 'etats', 'categories', 'annees'];
        fields.forEach(async element => {
            await axios.get(`${process.env.REACT_APP_API_URL}/biblio/${element}`)
                .then(res => {
                    res = res.data
                    this.setState({ [element]: res })
                })
                .catch((e) => console.log(e.response))
        });
    }
    render() {
        const fields = { 'types': 'Types', 'langs': 'Langues', 'etats': 'États', 'categories': 'Catégories', 'annees': 'Années' };
        return (
            <div className='biblio-nav' >
                <div className='biblio-nav-body'>
                    {
                        Object.keys(fields).map(key =>
                            <div>
                                <h2>{fields[key]}</h2>
                                <ul>
                                    {
                                        this.state[key].map(element =>
                                            <li key={element._id} ><button id={element._id} className='selected' onClick={this.props.addFilter}>{element.titre}</button> </li>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

