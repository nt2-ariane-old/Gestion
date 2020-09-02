/*eslint-disable*/
import React, { Component } from "react";

export default class MaterielView extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let materiel = this.props.materiel
        return (
            <tr className='materiel-row' >
                <td>{materiel.item}</td>
                <td>{materiel.type}</td>
                <td>{materiel.compagnie}</td>
            </tr>
            
        )
    }
}

