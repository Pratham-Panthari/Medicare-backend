const Appointment = require('../models/Appointments')
const Users = require('../models/User')
const Doctor = require('../models/Doctors')

const createAppointment = async (req, res) => {
    try {
        const { paitent, doctors, time } = req.body
        const appointment = await Appointment.create({ paitent, doctors, time })
        await Users.findByIdAndUpdate(paitent, { appointment: appointment._id })
        await Doctor.findByIdAndUpdate(doctors, { appointment: appointment._id })
        res.status(200).send({
            status: 'success',
            message: 'Appointment booked successfully',
            appointment
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).populate('paitent', 'name email phno').populate('doctors', 'name email phno')
        res.status(200).send({
            status: 'success',
            message: 'Data fetched successfully',
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const id = req.params.id
        const appointment = await Appointment.findByIdAndDelete(id)
        
        res.status(200).send({
            status: 'success',
            message: 'Appointment Deleted successfully',
            appointment
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
} 

module.exports = { createAppointment, getAllAppointments, deleteAppointment }