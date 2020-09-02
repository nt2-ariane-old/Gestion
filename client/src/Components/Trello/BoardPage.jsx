import react, { Component } from 'react'
import Board from 'react-trello'

export default class BoardPage extends Component {
    render = () => {
        return (
            <Board data={this.props.board} />
        )
    }
}