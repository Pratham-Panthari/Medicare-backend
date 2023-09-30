const express = require('express')
const {createService, getAllServices} = require('../controllers/servicesController')

const router = express.Router()

router.post('/add-service', createService)
router.get('/get-all-services', getAllServices)

module.exports = router