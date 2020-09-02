import React, { Component } from 'react'
import users from '../../api/user'
import { BeatLoader } from 'react-spinners';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            password: '',
            update: false,
            isLoading: false,
            error: false,
        }
    }
    handleChange = (event) => {
        event.persist()
        this.setState({ [event.target.id]: event.target.value });
    }
    componentDidMount = async () => {
        let token = this.props.match.params.token;
        users.testResetToken({ resetPasswordToken: token })
            .then(response => {
                console.log(response.data)
                if (response.data.message === 'Le lien est valide') {
                    this.setState({
                        id: response.data.id,
                        update: false,
                        isLoading: false,
                        error: false
                    })
                }
                else {
                    this.setState({
                        update: false,
                        isLoading: false,
                        error: true
                    })
                }
            })
            .catch(error => this.setState({ error: true }));
    }
    handleSubmit = e => {
        e.preventDefault();
        users.updatePasswordViaEmail({
            id: this.state.id,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({
                        updated: true,
                        error: false,
                    })
                }
                else {
                    this.setState({
                        updated: false,
                        error: true,
                    })
                }
            })
            .catch(error => console.log(error.data))
    }
    render = () => {
        const { password, error, isLoading, updated } = this.state
        console.log(error)
        return (
            this.state.isLoading ?
                <BeatLoader
                    color={'#e17b42'}
                    loading={this.state.isLoading}
                />
                :
                updated ?
                    <div className="alert alert-success" role="alert">
                        Votre mot de passe à bien été modifié.
                                        < a href='/' > Retourner à l'accueil</a>
                        <a href='/reset'>Réessayer d'envoyer le lien</a>
                    </div>

                    :
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Identifiant">Mot de passe</label>
                            <input type="password" name="password" placeholder="Entrer Mot de passe" onChange={this.handleChange} id="password" value={password} />
                        </div>
                        <button type="submit">
                            <span>Changer votre mot de passe</span>
                        </button>
                        <a href='/'>Retourner à l'accueil</a>
                    </form>
    
        )
}
}