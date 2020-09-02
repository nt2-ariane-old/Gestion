const express = require('express')
const router = express.Router()

const Projet_Web_Task = require('../models/projet_web_task')

// Get all subscribers
router.get('/projets_web/task/all', async (req, res) => {
    try {
        const tasks = await Projet_Web_Task.find()
        res.json(tasks)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/projets_web/task/:id', getProjetWebTask, (req, res) => {
    res.status(200).json({ task: res.task })
})

// Create one subscriber
router.post('/projets_web/task', async (req, res) => {
    const task = new Projet_Web_Task({
        title: req.body.title,
        group: req.body.group,
        start_time: req.body.start_time,
        end_time: req.body.end_time

    })
    console.log(task)
    try {
        const nouveau_task = await task.save()
        res.status(201).json(nouveau_task)
    } catch (err) {
        res.status(402).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/projets_web/task/:id', getProjetWebTask, async (req, res) => {
    if (req.body.title) {
        res.task.title = req.body.title
        res.task.group = req.body.group
        res.task.start_time = req.body.start_time
        res.task.end_time = req.body.end_time
    }
    try {
        const updated_task = await res.task.save()
        res.status(201).json(updated_task)
    } catch (err) {
        res.status(402).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/projets_web/task/:id', getProjetWebTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Projet supprimé' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProjetWebTask(req, res, next) {

    try {
        task = await Projet_Web_Task.findById(req.params.id)
        if (task === null) {
            return res.status(404).json({ message: 'Projet non trouvé' })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.task = task
    next()
}
module.exports = router