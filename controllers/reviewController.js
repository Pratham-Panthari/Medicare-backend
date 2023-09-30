const Reviews = require('../models/Reviews')
const Doctor = require('../models/Doctors')
const Users = require('../models/User')

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find({})

        res.status(200).send({
            status: 'success',
            message: 'Reviews fetched successfully',
            reviews
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const createReview = async (req, res) => {

    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.params.userId

    const newReview = new Reviews(req.body)

    try {

        const savedReview = await newReview.save()

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).send({
            status: 'Success',
            message: 'review submitted successfully',
            savedReview
        })
        
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}
module.exports = { getAllReviews, createReview }