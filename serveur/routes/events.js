const express = require('express')
const router = express.Router()
const Event = require('../models/event')

//Api Google pour le calendrier
const google = require('../google-api')
const fs = require('fs')
// Load client secrets from a local file.



// Get all events
router.get('/', async (req, res) => {

    try {
        await connectToApi(google.listEvents).then((events) => {
            res.json(events)
        })
            .catch((e) => console.log(e))

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

// Get one event
router.get('/:id', getEvent, (req, res) => {
    try {
        // connectToApi(google.updateEvent, { 'event': event }).then((events) => {
        //     res.status(201).json(newEvent)
        // });
        res.event.then((e) => res.status(201).json(e))

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Create one event
router.post('/', async (req, res) => {
    const event = new Event({
        name: req.body.name,
    })

    try {
        connectToApi(google.createEvent, { 'event': event }).then((event) => {
            res.status(201).json(event)
        });
        // res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getEvent, async (req, res) => {
    if (req.body.name != null) {
        res.event.name = req.body.name
    }

    try {
        const updatedEvent = await res.event.save()
        res.json(updatedEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// Delete one subscriber
router.delete('/:id', deleteEvent, async (req, res) => {
    try {
        await res.event.remove()
        res.json({ message: 'Deleted This Event' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//functions
async function getEvent(req, res, next) {
    try {
        event = connectToApi(google.getEvent, { 'id': req.params.id })
        if (event == null) {
            return res.status(404).json({ message: 'Cant find event' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.event = event
    next()
}
async function deleteEvent(req, res, next) {
    try {
        event = connectToApi(google.deleteEvent, { 'id': req.params.id })
        if (event == null) {
            return res.status(404).json({ message: 'Cant find event' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.event = event
    next()
}

async function connectToApi(callback, params = {}) {
    try {
        return new Promise((resolve, reject) => {
            fs.readFile('credentials.json', async (err, content) => {
                if (err)
                    return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Drive API.

                await google.authorize(JSON.parse(content), (auth) => auth_infos = auth)
                    .then(
                        (auth) => {
                            callback(auth, params).then((result) => {
                                resolve(result)
                            })
                        }
                    )
                    .catch((e) => console.log(e))
            });

        });
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = router