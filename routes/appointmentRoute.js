const express = require('express')
const { createAppointment, getAllAppointments, deleteAppointment } = require('../controllers/appointmentController')


const router = express.Router()

router.post('/create-appointment', createAppointment)
router.get('/get-all-appointments', getAllAppointments)
router.delete('/delete-appointment/:id', deleteAppointment)

module.exports = router