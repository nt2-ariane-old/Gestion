import React, { Component } from 'react'
import TrelloClient, { Trello } from 'react-trello-client'
import TrelloTeam from './TrelloTeam'
import { BeatLoader } from 'react-spinners';

export default class TrelloPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            isLoading: false,
            boards: [],
            organisations: []
        }
    }
    componentDidUpdate = (prevProps, prevStates) => {
        if (this.state.isLoggedIn !== prevStates.isLoggedIn) {
            Trello.get(
                'members/me',
                (info) => {
                    console.log(info)
                    this.setState({isLoading:false})
                    this.setState({ boards: info.idBoards, organisations: info.idOrganizations })
                },
                (e) => console.log('Failed to get member : ' + e)
            )
        }
    }

    login = () => {
        if (!this.state.isLoggedIn) {
            this.setState({ isLoggedIn: true })
        }
    }

    render() {
        const { organisations, boards, isLoggedIn, isLoading } = this.state

        return (
            <div className="trello">
                {isLoading ?
                    <BeatLoader
                        color={'#e17b42'}
                        loading={this.state.isLoading}
                    />
                    :
                    isLoggedIn ?

                        <div className='trello-teams-list'>

                            {
                                organisations.map(item => {
                                    return <TrelloTeam key={item} id={item} />
                                })
                            }
                        </div>


                        :

                        <div className="card">
                            <h1 className="card-title">Please login to continue...</h1>

                            <TrelloClient
                                apiKey="a85cbff1ee761ab0ac7d92086309f65b" // Get the API key from https://trello.com/app-key/
                                clientVersion={1} // number: {1}, {2}, {3}
                                apiEndpoint="https://api.trello.com" // string: "https://api.trello.com"
                                authEndpoint="https://trello.com" // string: "https://trello.com"
                                intentEndpoint="https://trello.com" // string: "https://trello.com"
                                authorizeName="Gestion NT2" // string: "React Trello Client"
                                authorizeType="popup" // string: popup | redirect
                                authorizePersist={true}
                                authorizeInteractive={true}
                                authorizeScopeRead={false} // boolean: {true} | {false}
                                authorizeScopeWrite={true} // boolean: {true} | {false}
                                authorizeScopeAccount={true} // boolean: {true} | {false}
                                authorizeExpiration="never" // string: "1hour", "1day", "30days" | "never"
                                authorizeOnSuccess={this.login} // function: {() => console.log('Login success!')}
                                authorizeOnError={() => console.log("Login error!")} // function: {() => console.log('Login error!')}
                                autoAuthorize={true} // boolean: {true} | {false}
                                authorizeButton={true} // boolean: {true} | {false}
                                buttonStyle="metamorph" // string: "metamorph" | "flat"
                                buttonColor="green" // string: "green" | "grayish-blue" | "light"
                                buttonText="Se Connecter à Trello" // string: "Login with Trello"
                            />
                        </div>

                }
            </div>

        )
    }
}