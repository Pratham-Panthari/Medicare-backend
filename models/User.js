const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    phno : {
        type: Number,
    },
    photo : {
        type: String,
    },
    role: {
        type: String,
        enum: ["paitent", "doctor", "admin"],
        default: "patient",
    },
    gender: { 
        type: String,
        enum: ["male", "female"],
    },
    bloodType : {
        type: String,
    },
    appointment: [{
        type: mongoose.Types.ObjectId, 
        ref: "Appointment"
    }],
}, {timestamps: true})

const Users = mongoose.model('Paitent', userSchema)

module.exports = Users