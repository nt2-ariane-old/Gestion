import React, { Component } from "react";

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ProjetsTimeline from "./ProjetsTimeline";

export default class ProjetsWeb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projets: null
        }
    }
    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/projets_web`)
            .then(res => {
                res = res.data
                console.log(res)
                this.setState({ projets: res })
            })
            .catch((e) => console.log(e))
    }
    render() {
        const { projets } = this.state
        return (
            <div className='projets-web'>
                <div className='projets-web-header'>
                    <a href='/projets/web/edit'>
                        <FontAwesomeIcon icon={faPlus} />
                    </a>
                </div>
                <div className='projets-web-body'>
                    {this.state.projets &&
                        <ProjetsTimeline projets={this.state.projets} />
                    }
                    <ul>
                        {projets ?

                            projets.map((projet) =>
                                <li key={projet._id}>
                                    <a href={`/projets/web/edit/${projet._id}`}>
                                        {projet.title}
                                    </a>
                                </li>
                            )
                            :
                            'Aucun projet'
                        }
                    </ul>
                </div>
            </div>
        )
    }
}