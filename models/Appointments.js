const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    paitent : {
        type: mongoose.Types.ObjectId,
        ref: 'Paitent'
    },
    doctors : {
        type: mongoose.Types.ObjectId,
        ref: 'Doctors'
    },
    time: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment