const mongoose = require('mongoose')

const individuSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    titre: {
        type: Array,
    },
    compagnie: {
        type: Array,
    },
    telephone: {
        type: Array,
    },
    courriel: {
        type: Array,
    },
    estEmploye: { type: Boolean, required: true, default: false },
    estAdmin: { type: Boolean, required: true, default: false },

})

module.exports = mongoose.model('Individu', individuSchema)
