import React, { Component } from "react";
import axios from "axios";

import OrganisationRow from './OrganisationRow'

export default class OrganisationsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            organisations: [],
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount = async () => {
        axios.get(process.env.REACT_APP_API_URL + '/organisations')
            .then(response => {
                this.setState({
                    organisations: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleClick = (e) => {
        e.persist()
        const target = e.currentTarget
        window.location = `/Organisation/${target.id}`;
    }
    render() {

        return (
            <div className="organisations-list">
                <div className="org-table-container" role="table" aria-label="Organisations">
                    <div className="org-flex-table header" role="rowgroup">
                        <div className="org-flex-row first" role="columnheader">Nom</div>
                        <div className="org-flex-row" role="columnheader">Type</div>
                        <div className="org-flex-row" role="columnheader">Affiliation</div>
                        <div className="org-flex-row" role="columnheader">Telephone</div>
                    </div>
                    {this.state.organisations.map(value =>
                        <OrganisationRow organisation={value} handleClick={this.handleClick} />
                    )}
                </div>


            </div>
        )
    }
}