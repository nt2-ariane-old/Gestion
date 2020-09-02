import React, { Component } from 'react'
import { Trello } from 'react-trello-client'

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: '',
            url: '',
            bg: '',
        }
    }
    componentDidMount() {
        Trello.get(
            '/boards/' + this.state.id,
            (info) => {
                console.log(info)
                this.setState({ name: info.name, url: info.url, bg: info.prefs.backgroundImage })

            },
            (e) => console.log('Failed to get board : ' + e)
        )
    }
    render() {
        return (
            <div className='board' style={{ backgroundImage: `url(${this.state.bg})`}}>
                <a href={this.state.url} target="_blank">
                    <span className='board-name'>
                        {this.state.name}

                    </span>
                </a>
            </div>
        )
    }
}
