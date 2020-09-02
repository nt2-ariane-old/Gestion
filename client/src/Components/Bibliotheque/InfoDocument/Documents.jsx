import React, { Component } from "react";
import axios from 'axios'

export default class Documents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documents: []
        }
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/biblio`)
            .then(res => {
                res = res.data
                this.setState({ documents: res })
            })
            .catch((e) => console.log(e.response))
    }

    render() {
        return (
            <div className='documents'>
                <ul>
                    {
                        this.state.documents.map((document) => {
                            console.log(document)
                            return <div className='document'>
                                <a key={document.id} href={`/bibliotheque/document/${document._id}`}> {document.titre}</a>
                                <span>{document.auteur}</span>
                            </div>
                        }
                        )
                    }
                </ul>
            </div >
        )
    }
}