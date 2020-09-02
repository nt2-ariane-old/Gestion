/*eslint-disable*/
import React, { Component } from "react";
import Conversation from './Conversation'
export default class SlackConversations extends Component {
    render() {
        const { conversations } = this.props
        return (
            <div id='slack-conversations'>
                {conversations.map((item) =>
                    <Conversation id={item} removeOpenConversation={this.props.removeOpenConversation} user={this.props.user} />

                )}

            </div>
        )
    }
}

