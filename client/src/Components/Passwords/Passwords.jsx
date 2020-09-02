/*eslint-disable*/
import React, { Component } from "react";
import axios from 'axios'
export default class Passwords extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vault: null
        }
    }
    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/passwords`)
            .then(res => {
                res = res.data
                console.log(res)
                this.setState({ vault: res })
            })
            .catch((e) => console.log(e.response))
    }
    render() {
        return (
            <div className='passwords-manager' >
                <div className='passwords-manager-header'>

                </div>
                <div className='passwords-manager-body'>

                </div>
            </div>
        )
    }
}

