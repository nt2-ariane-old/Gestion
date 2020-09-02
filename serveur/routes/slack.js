const express = require('express')
const router = express.Router()
const { WebClient, ErrorCode } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

const slackEvents = createEventAdapter(slackSigningSecret);

// Initialize
const web = new WebClient(token);
// Get all subscribers
router.get('/', (req, res) => {
    res.status(200).json(web);
})

// Get one subscriber
router.get('/users', async (req, res) => {
    try {
        // This method call should fail because we're giving it a bogus user ID to lookup.
        const response = await web.users.list()
        res.status(200).send(response)
    } catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            // Some other error, oh no!
            console.log('Well, that was unexpected.');
        }
        res.send(400).json(error)
    }
})
router.post('/users', async (req, res) => {
    try {
        const required_users = req.body.users
        const all_users = await web.users.list()
        const response = {}

        all_users.members.forEach(element => {
            if (required_users.includes(element.id)) {
                response[element.id] = element
            }
        });
        return res.status(200).send(response)
    } catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            // Some other error, oh no!
            console.log('Well, that was unexpected.');
            console.log(error)
        }
        return res.status(400).json(error)
    }
})
router.get('/channels', async (req, res) => {
    try {
        // This method call should fail because we're giving it a bogus user ID to lookup.
        const response = await web.conversations.list()
        return res.status(200).send(response)
    } catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            // Some other error, oh no!
            console.log(error);
        }
        res.status(400).json(error)
    }
})
router.get('/login/:code', async (req, res) => {
    try {
        // This method call should fail because we're giving it a bogus user ID to lookup.
        console.log(process.env.SLACK_CLIENT_ID)
        console.log(process.env.SLACK_CLIENT_SECRET)
        console.log(req.params.code)
        const response = await web.oauth.access({ code: req.params.code, client_secret: process.env.SLACK_CLIENT_SECRET, client_id: process.env.SLACK_CLIENT_ID, redirect_uri: 'http://localhost:8000/slack' })
        return res.status(200).send(response)
    } catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            // Some other error, oh no!
            console.log(error);
        }
        res.status(400).json(error)
    }
})
router.get('/conversation/:id', getConversation, (req, res) => {
    res.json(res.conversation)
})
router.get('/conversation/user/:token', async (req, res) => {
    try {
        // This method call should fail because we're giving it a bogus user ID to lookup.
        const response = await web.users.conversations({ token: req.params.token })
        return res.status(200).send(response)
    } catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            // Some other error, oh no!
            console.log(error);
        }
        res.status(400).json(error)
    }
})

// Create one subscriber
router.post('/message', (req, res) => {
    try {
        web.chat.postMessage({
            channel: req.body.channel,
            text: req.body.text,
            as_user: true
        });
        res.status(200).send('Message posted!');
    } catch (error) {
        res.status(400).json({ error: error });
    }
})
//functions
async function getConversation(req, res, next) {
    try {
        console.log(req.params.id)
        // messages = await web.conversations.history({ channel: req.params.id })
        // infos = await web.conversations.info({ channel: req.params.id })
        messages = await web.conversations.history({ channel: req.params.id })
        infos = await web.conversations.info({ channel: req.params.id })
        if (infos == null) {
            return res.status(404).json({ message: 'Cant find convos' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.conversation = { messages: messages, infos: infos }
    next()
}

module.exports = { router, web }
