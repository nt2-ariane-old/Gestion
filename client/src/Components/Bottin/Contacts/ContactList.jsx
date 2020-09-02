import React, { Component } from "react";
import axios from "axios";

import Contact from './Contact'
import ContactPopup from './ContactPopup'
export default class ContactList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            individus: [],
            showPopup: false,
            popup_individu: null,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount = async () => {
        axios.get(process.env.REACT_APP_API_URL + '/individus/' + this.props.type)
            .then(response => {
                this.setState({
                    individus: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleClick = (e) => {
        e.preventDefault()
        const id = e.currentTarget.id;
        let individu = null
        let showPopup = false
        this.state.individus.forEach(element => {
            if (element._id === id) {
                individu = element
                showPopup = true
            }
        });
        this.setState({ showPopup: showPopup, popup_individu: individu })
    }
    closePopup = () => {
        this.setState({ showPopup: false, popup_individu: null })
    }
    render() {
        const { individus, showPopup, popup_individu } = this.state
        const { tableMode, lineMode, isAdmin } = this.props
        return (
            <div className="contact-list">
                {individus.map((value, index) => <Contact tableMode={tableMode} lineMode={lineMode} key={'contact_' + index} id={value._id} infos={value} onClick={this.handleClick} />)}
                {showPopup && popup_individu !== null &&
                    <ContactPopup isAdmin={isAdmin} id={popup_individu._id} closePopup={this.closePopup} infos={popup_individu} onClick={this.handleClick} />
                }
            </div>
        )
    }
}