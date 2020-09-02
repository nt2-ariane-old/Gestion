
const express = require('express')
const router = express.Router()

const Projet_Web = require('../models/projet_web')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const projets = await Projet_Web.find()
        res.json(projets)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getProjetWeb, (req, res) => {
    res.status(200).json({ projet: res.projet })
})

// Create one subscriber
router.post('/', async (req, res) => {
    const projet = new Projet_Web({
        title: req.body.title,
        url: req.body.url,
        body:req.body.body,
        drive: req.body.drive,
        trello: req.body.trello,
        github: req.body.github,
        direction: req.body.direction,
        chef: req.body.chef,
        interne: req.body.interne,
        externe: req.body.externe,
    })
    try {
        const nouveau_projet = await projet.save()
        res.status(201).json(nouveau_projet)
    } catch (err) {
        res.status(402).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getProjetWeb, async (req, res) => {
    if (req.body.title) {
        res.projet.title = req.body.title
        res.projet.url = req.body.url
        res.projet.body = req.body.body
        res.projet.drive = req.body.drive
        res.projet.trello = req.body.trello
        res.projet.github = req.body.github
        res.projet.direction = req.body.direction
        res.projet.chef = req.body.chef
        res.projet.interne = req.body.interne
        res.projet.externe = req.body.externe
    }
    try {
        const updated_projet = await res.projet.save()
        res.status(201).json(updated_projet)
    } catch (err) {
        res.status(402).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getProjetWeb, async (req, res) => {
    try {
        await res.projet.remove()
        res.json({ message: 'Projet supprimé' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProjetWeb(req, res, next) {

    try {
        projet = await Projet_Web.findById(req.params.id)
        if (projet === null) {
            return res.status(404).json({ message: 'Projet non trouvé' })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.projet = projet
    next()
}
module.exports = router