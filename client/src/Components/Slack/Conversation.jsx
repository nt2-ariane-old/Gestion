import React, { Component } from "react";
import axios from 'axios'
export default class Conversation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: null,
            infos: null,
            isLoading: false,
            members: [],
            answer: ''
        }
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.id !== this.props.id) {
            this.getInfos()
        }
    }
    componentDidMount = () => {
        this.getInfos()
    }
    getInfos = async () => {
        const { id } = this.props
        await axios.get(`${process.env.REACT_APP_API_URL}/slack/conversation/${id}`)
            .then(async res => {
                res = res.data
                this.setState({ isLoading: false, messages: res.messages.messages.reverse(), infos: res.infos.channel })
                let users = []
                res.messages.messages.forEach(message => {
                    if (!(message.user in users)) {
                        users.push(message.user)
                    }
                });
                await axios.post(`${process.env.REACT_APP_API_URL}/slack/users`, { users: users })
                    .then(res => {
                        res = res.data
                        console.log(res)
                        this.setState({ members: res })
                    })
            })
            .catch(err => {
                console.log(err.response)
            })

    }
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    handleSubmit = async e => {
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/slack/message`, { channel: this.props.id, text: this.state.answer, as_user: true })
            .then(res => {
                res = res.data
                
                setTimeout(this.getInfos,1000)
                this.setState({ answer: '' })
            })
    }
    handleClick = e => {
        this.props.removeOpenConversation(this.props.id)
    }
    render() {
        const { messages, infos, isLoading, members, answer } = this.state
        return (

            isLoading ?
                (<div className='slack-conversation'>loading...</div >)
                :

                <div className='slack-conversation'>


                    <div className='slack-conversation-header' onClick={this.handleClick}>
                        {
                            infos &&
                            <span className='conversation-name'>#{infos.name}</span>
                        }
                    </div>
                    <div className='slack-conversation-body'>
                        {
                            messages && members &&
                            messages.map((message => {
                                console.log(message)

                                return (
                                    <div className='message-container' style={{ alignItems: this.props.user.slack.id === message.user ? 'flex-end' : 'flex-start' }}>
                                        <div className='message' style={{ backgroundColor: this.state.members[message.user] ? '#' + this.state.members[message.user].color : 'inherited' }}>
                                            <span>{message.text}</span>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </div>
                    <div className='slack-conversation-answer'>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" onChange={this.handleChange} id='answer' value={answer} />
                        </form>
                    </div>
                </div>


        )
    }
}