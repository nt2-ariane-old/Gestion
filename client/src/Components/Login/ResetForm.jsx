import React, { Component } from 'react'
import users from '../../api/user'
import { BeatLoader } from 'react-spinners';

export default class FirstLoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            error: '',
            success: '',
            isLoading: false
        }
    }
    handleChange = (event) => {
        event.persist()
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        if (this.state.email === "") {
            this.setState({
                error: 'Veuillez entrez un courriel.',
                success: null
            })
        } else {
            this.setState({ isLoading: true })
            users.resetPassword({ email: this.state.email }).then(infos => {
                this.setState({ isLoading: false })
                if (infos.error) {
                    this.setState({
                        error: infos.error,
                        success: null
                    })
                }
                if (infos.success) {
                    this.setState({
                        error: null,
                        success: infos.success
                    })
                }
                console.log(infos)
            })
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
                    {this.props.success &&
                        <div className="alert alert-success" role="alert">
                            {this.props.success}
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="Identifiant">Courriel</label>
                        <input type="email" name="email" placeholder="Entrer Courriel" onChange={this.handleChange} id="email" value={this.state.email} />
                    </div>
                    <button type="submit">
                        <span>Envoyer Courriel</span>
                    </button>
                    <div className='login-links'>
                        <a href="/first-login" className="login-reset" onClick={this.props.setSignup}>Première Connexion ?</a>
                        <a href="/" className="login-reset" onClick={this.props.setReset}>Déjà un compte ?</a>
                    </div>
                </form>
        )
    }
}
