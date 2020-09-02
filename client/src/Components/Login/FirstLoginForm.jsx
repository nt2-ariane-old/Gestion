import React, { Component } from 'react'
import users from '../../api/user'
import { BeatLoader } from 'react-spinners';

export default class FirstLoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',

            keepConnect: false,
            token: '',
            error: '',
            success: ''
        }
    }
    handleCheckBox = (event) => {
        event.persist()
        this.setState({ [event.target.id]: event.target.checked });
    }
    handleChange = (event) => {
        event.persist()
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let email = this.state.email
        let passwd = this.state.password
        if (email !== "" && passwd !== "") {
            if (this.validateEmail(email)) {
                this.setState({ isLoading: true, error: null })

                await users.signupUser({ email: email, password: passwd }).then(infos => {
                    console.log(infos)
                    if (typeof infos.message !== undefined) {
                        this.setState({ isLoading: false, error: infos.message })
                        return null
                    }
                    console.log(infos.data.token)
                    let isTemp = !this.state.keepConnect
                    this.props.setToken(infos.data.token, isTemp)

                    this.setState({ isLoading: false })
                })

            }
            else {
                this.setState({ error: "Veuillez entrez un courriel valide." })
            }
        }
        else {
            this.setState({ error: "Veuillez entrez un courriel, un mot de passe valide." })
        }
    }

    validateEmail = (email) => {
        const expression = /\S+@labo-nt2.org/
        return expression.test(String(email).toLowerCase())
    }
    render = () => {
        return (
            this.state.isLoading ?
                <BeatLoader
                    color={'#e17b42'}
                    loading={this.state.isLoading}
                />
                :
                <form onSubmit={this.handleSubmit}>

                    {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="Identifiant">Courriel</label>
                        <input type="email" name="email" placeholder="Entrer Courriel" onChange={this.handleChange} id="email" value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Identifiant">Mot de passe</label>
                        <input type="password" name="password" placeholder="Entrer Mot de passe" onChange={this.handleChange} id="password" value={this.state.password} />
                    </div>
                    <div className="form-group same-line">
                        <label htmlFor="Identifiant">Rester Connecté</label>
                        <input type="checkbox" name="keepConnect" id="keepConnect" onChange={this.handleCheckBox} defaultChecked={this.state.keepConnect} />
                    </div>
                    <button type="submit">
                        <span>Inscription</span>
                    </button>
                    <div className='login-links'>
                        <a href="/" className="login-reset" onClick={this.props.setSignup}> Déjà un compte ?</a>
                        <a href="/reset" className="login-reset" onClick={this.props.setReset}>Mot de passe oublié ?</a>
                    </div>
                </form>
        )
    }
}
