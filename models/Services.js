const mongoose = require('mongoose')

const serviceModel = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Services = mongoose.model('Services', serviceModel)

module.exports = Services