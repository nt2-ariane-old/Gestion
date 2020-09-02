const express = require('express')
const router = express.Router()
const Inventaire = require('../models/inventaire')

// Get all inventaires
router.get('/', async (req, res) => {
    try {
        const inventaires = await Inventaire.find()
        res.json(inventaires)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

// Get one inventaire
router.get('/:id', getEvent, (req, res) => {
    res.json(res.inventaire)
})

// Create one inventaire
router.post('/', async (req, res) => {
    const inventaire = new Inventaire({
        name: req.body.name,
    })

    try {
        const newEvent = await inventaire.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getEvent, async (req, res) => {
    if (req.body.name != null) {
        res.inventaire.name = req.body.name
    }

    try {
        const updatedEvent = await res.inventaire.save()
        res.json(updatedEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// Delete one subscriber
router.delete('/:id', getEvent, async (req, res) => {
    try {
        await res.inventaire.remove()
        res.json({ message: 'Deleted This Inventaire' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//functions
async function getEvent(req, res, next) {
    try {
        inventaire = await Inventaire.findById(req.params.id)
        if (inventaire == null) {
            return res.status(404).json({ message: 'Cant find inventaire' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.inventaire = inventaire
    next()
}

module.exports = router