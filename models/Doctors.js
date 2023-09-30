const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
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
    Price : {
        type: Number,
    },
    role : {
        type: String,
    },
    specialization : {
        type: String,
    },
    qualifications : {
        type: Array,
    },
    experiences : {
        type: Array,
    },
    bio: {
        type: String, 
        maxLength: 50,
    },
    about : {
        type: String,
    },
    timeSlots : {
        type: Array,
    },
    reviews: [{ 
        type: mongoose.Types.ObjectId,
        ref: "Reviews",
    }],
    averageRatings : {
        type: Number,
        default: 0,
    },
    totalRatings : {
        type: Number,
        default: 0,
    },
    isApproved : {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    appointment: [{
        type: mongoose.Types.ObjectId,
        ref: "Appointment",
    }],
}, { timestamps: true })

const Doctor = mongoose.model('Doctors', doctorSchema)

module.exports = Doctor