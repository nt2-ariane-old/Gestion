const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true,
        default: "2020-03-25T20:26:24.040Z"
    },
    end: {
        type: Date,
        required: true,
        default: "2020-03-25T23:26:24.040Z"
    }
})

module.exports = mongoose.model('Event', eventSchema)
