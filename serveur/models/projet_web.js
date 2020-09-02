
const mongoose = require('mongoose')

const projetWebSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date_debut: {
        type: Date,
        default: Date.now(),
    },
    date_fin: {
        type: Date,
        default: Date.now(),
        required: true
    },
    url: String,
    body: String,
    drive: String,
    trello: String,
    github: String,
    direction: Array,
    chef: Array,
    interne: Array,
    externe: Array
})

module.exports = mongoose.model('Projet_Web', projetWebSchema)
