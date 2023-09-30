const express = require('express')
const { createFaq, getAllFaq, updateFaq, deleteFaq } = require('../controllers/faqController')

const router = express.Router()

router.post('/create-faq', createFaq)
router.get('/get-all-faqs', getAllFaq)
router.delete('/delete-faq/:id', deleteFaq)
router.put('/update-faq/:id', updateFaq)


module.exports = router