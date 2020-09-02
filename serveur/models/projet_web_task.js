
const mongoose = require('mongoose')
const projetWebTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    start_time: {
        type: Number,
        required: true
    },
    end_time: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Projet_Web_Task', projetWebTaskSchema)
