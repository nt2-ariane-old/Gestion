/*eslint-disable*/
import React, { Component } from "react";
import MaterielRow from './MaterielRow'
export default class Inventaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materiels: []
        }
    }
    render() {
        return (
            <div className='inventaire' >
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Compagnie</th>
                    </tr>

                    {
                        this.state.materiels.map(materiel => {
                            <MaterielRow materiel={materiel} />
                        })
                    }
                </table>
            </div>
        )
    }
}

