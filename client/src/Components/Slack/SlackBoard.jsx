/*eslint-disable*/
import React, { Component } from "react";
import axios from 'axios'
import queryString from 'query-string';
import users from '../../api/user'
export default class SlackBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
        }
    }
    componentDidMount = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/slack/users`)
            .then(res => {
                res = res.data
                this.setState({ members: res.members })
            })
        let url = this.props.location.search;
        let params = queryString.parse(url);

        let code = params.code
        let client_id = process.env.REACT_APP_SLACK_CLIENT_ID
        let client_secret = process.env.REACT_APP_SLACK_CLIENT_SECRET
        let user_id = this.props.user._id
        console.log(this.props.user)
        if (code) {
            await axios
                .get(`https://slack.com/api/oauth.v2.access?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
                .then(res => {
                    res = res.data
                    if (res.authed_user) {
                        console.log(res)
                        console.log()
                        users
                            .addSlackInfos({ slack: res.authed_user, user_id: user_id })
                            .then((res) => window.location = '/slack')
                    }
                })
                .catch(e => {
                    console.log(e)
                    console.log(e.response)
                })
        }
    }
    render() {
        const { members } = this.state
        return (
            <div className='slack'>
                <h1>Slack</h1>
                {!this.props.user.slack &&
                    <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=867796263285.1029798877539"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
                }
                <ul>
                    {
                        members.map((member, i) => {
                            return <li key={i}>{member.real_name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

