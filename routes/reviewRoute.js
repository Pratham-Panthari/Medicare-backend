const express = require('express')
const { getAllReviews, createReview } = require('../controllers/reviewController')
const { loginRequire } = require('../middlewear/authMiddlewear')

const router = express.Router({ mergeParams: true })

router.post('/create-review', loginRequire, createReview )
router.get('/get-all-reviews', getAllReviews )

module.exports = router