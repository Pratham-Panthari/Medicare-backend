const Doctor = require('../models/Doctors')

const updateDoctor = async (req, res) => {
    try {
        const id = req.params.id

        const user = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res.status(200).send({
            status: 'success',
            message: 'User Updated Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id

        const user = await Doctor.findByIdAndDelete(id)

        res.status(200).send({
            status: 'success',
            message: 'User Deleted Successfully',
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const getSingleDoctor = async (req, res) => {
    try {
        const id = req.params.id

        const doctor = await Doctor.findById(id).populate('reviews').select('-password')

        res.status(200).send({
            status: 'success',
            message: 'User fetched Successfully',
            doctor
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {

        const { query } = req.query
        const { limit } = req.query

        let doctors = null

        if(query){
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or : [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ]
            }).populate('reviews').select('-password').limit(limit)
        }
        else{
            doctors = await Doctor.find({}).populate('reviews').select('-password').limit(limit)
        }

        

        res.status(200).send({
            status: 'success',
            message: 'User Updated Successfully',
            doctors
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const searchDoctor = async(req, res) => {
    try {
        const keyword = req.params.keyword
        const result = await Doctor.find({
            $or: [
                {
                    name: {
                        $regex: keyword, 
                        $options: "i",
                    }
                },
                {
                    specialization: {
                        $regex: keyword,
                        $options: "i",
                    }
                }
            ]
        })
        res.status(200).send({
            status: 'success',
            message: 'Fetch successfull',
            result
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

module.exports = { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor, searchDoctor }