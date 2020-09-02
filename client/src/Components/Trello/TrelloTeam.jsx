import React, { Component } from 'react'
import { Trello } from 'react-trello-client'
import Board from './Board'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCog,faUserFriends,faTable } from '@fortawesome/free-solid-svg-icons'

export default class TrelloTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: '',
            url: '',
            boards: []
        }
    }
    componentDidMount() {
        Trello.get(
            '/organizations/' + this.state.id,
            (info) => {
                this.setState({ name: info.displayName, url: info.url })

            },
            (e) => console.log('Failed to get organizations : ' + e)
        )
        Trello.get(
            '/organizations/' + this.state.id + '/boards',
            (info) => {
                this.setState({ boards: info })

            },
            (e) => console.log('Failed to get organizations : ' + e)
        )
    }
    render() {
        return (
            <div className='team'>
                <div className='team-header'>
                    <h3 className='team-name'><FontAwesomeIcon icon={faUserFriends} /> {this.state.name}</h3>
                    <div className='team-options'>
                        <a className='team-option' href={this.state.url}>
                            <FontAwesomeIcon icon={faTable} /> Tableaux
                        </a>
                        <a className='team-option' href={this.state.url + '/members'}>
                            <FontAwesomeIcon icon={faUser} /> Membres
                        </a>
                        <a className='team-option' href={this.state.url + '/account'}>
                            <FontAwesomeIcon icon={faCog } /> Paramètres
                        </a>

                    </div>
                </div>
                <div className='trello-boards-list'>

                    {
                        this.state.boards.map(item => {

                            return <Board key={item.id} id={item.id} />
                        })
                    }
                </div>
            </div>
        )
    }
}
