const express = require('express')
const { register, login } = require('../controllers/authController')
const { updateUser, deleteUser, getSingleUser, getAllUser } = require('../controllers/userController')
const { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor, searchDoctor } = require('../controllers/doctorController')
const { isAdmin } = require('../middlewear/authMiddlewear')
const reviewRoute = require('../routes/reviewRoute')

const router = express.Router()

router.use('/:doctorId/reviews', reviewRoute )

router.post('/sign-up', register)
router.post('/sign-in', login)
router.put('/update-paitent/:id', updateUser)
router.delete('/delete-paitent/:id', deleteUser)
router.get('/get-all-paitent', getAllUser)
router.get('/get-single-paitent/:id', getSingleUser)
router.put('/update-doctor/:id', updateDoctor)
router.delete('/delete-doctor/:id', deleteDoctor)
router.get('/get-all-doctors', getAllDoctor)
router.get('/search-doctor/:keyword', searchDoctor)
router.get('/get-single-doctor/:id', getSingleDoctor)


module.exports = router