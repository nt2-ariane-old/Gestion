/*eslint-disable*/
import React, { Component } from "react";
import axios from 'axios'
import { Slack } from "../../Components";
export default class SlackUsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
            channels: [],
            minimize: true,
        }
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/slack/users`)
            .then(res => {
                res = res.data
                this.setState({ members: res.members })
            })
        axios.get(`${process.env.REACT_APP_API_URL}/slack/channels`)
            .then(res => {
                res = res.data
                this.setState({ channels: res.channels })
            })
    }
    handleClick = (e) => {
        this.setState({ minimize: !this.state.minimize })
    }
    handleConversation = (e) => {
        this.props.addOpenConversation(e.target.id)
    }
    render() {
        const { members, channels, minimize } = this.state
        const { user } = this.props
        return (
            <div id='slack-contacts'>
                <div className='slack-contacts-header' onClick={this.handleClick} >
                    <span>Clavardage</span>
                </div>
                {
                    !minimize ?
                        user.slack ?
                        <div className='slack-contacts-body'>
                            <span className='slack-contacts-title'>Members</span>
                            <ul>
                                {
                                    members.map((member) => {
                                        return !member.is_bot && member.id !== user.slack.id && <li style={{ color: "#" + member.color }} id={member.id} key={member.id} onClick={this.handleConversation} >{member.real_name}</li>
                                    })
                                }
                            </ul>
                            <span className='slack-contacts-title'>Channels</span>
                            <ul>
                                {
                                    channels.map((channel, i) => {
                                        return <li key={i} id={channel.id} key={channel.id} onClick={this.handleConversation}>#{channel.name}</li>
                                    })
                                }
                            </ul>
                        </div>
                        :
                        <p>Veuillez vous connecter à <a href='/slack'>Slack</a></p>
                        :
                        ''
                }
            </div>
        )
    }
}

