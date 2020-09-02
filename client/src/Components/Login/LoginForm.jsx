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
            success: '',
            isLoading: false
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
        if (email !== "") {
            if (passwd !== "") {
                this.setState({ isLoading: true, error: null })
                if (this.state.isSignup) {
                    await users.signupUser({ email: email, password: passwd });
                    this.setState({ isSignup: false })
                }
                else {
                    console.log('login')
                    await
                        users.loginUser({ email: email, password: passwd }).then(info => {
                            this.setState({ isLoading: false })
                            console.log(info)
                            if (typeof info.message !== 'undefined') {
                                this.setState({ error: info.message })
                            }
                            else {

                                this.setState({
                                    token: info.data.token,
                                    isLoading: false,
                                })
                                if (this.state.token !== "") {
                                    let isTemp = !this.state.keepConnect
                                    this.props.setToken(this.state.token, isTemp)
                                }
                                else {
                                    this.setState({ error: "il y a une erreur" })
                                }
                            }
                        }).catch((error) => {
                            this.setState({ error: "il y a une erreur" })
                            console.error(error);
                        });
                }

            }
            else {
                this.setState({ error: "Veuillez entrez un mot de passe." })
            }
        }
        else {
            this.setState({ error: "Veuillez entrez un courriel." })
        }

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
                        <span>Connexion</span>
                    </button>
                    <div className='login-links'>
                        <a href="/first-login" className="login-reset">Première Connexion ?</a>
                        <a href="/reset" className="login-reset">Mot de passe oublié ?</a>
                    </div>
                </form>
        )
    }
}
