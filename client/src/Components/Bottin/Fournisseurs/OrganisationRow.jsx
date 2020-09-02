import React, { Component } from "react";

export default class OrganisationRow extends Component {
    render() {
        const value = this.props.organisation
        return (
            <div id={value._id} className="org-flex-table org-row" role="rowgroup" onClick={this.props.handleClick}>
                <div className="org-flex-row first" role="cell"> {value.nom}</div>
                <div className="org-flex-row" role="cell">{value.type} </div>
                <div className="org-flex-row" role="cell">{value.affiliation}</div>
                <div className="org-flex-row" role="cell">{value.telephone}</div>
            </div>
        )
    }
}