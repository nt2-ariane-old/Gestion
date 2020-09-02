const mongoose = require('mongoose')

const inventaireSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    compagnie: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    licence: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    
})

module.exports = mongoose.model('Inventaire', inventaireSchema)
