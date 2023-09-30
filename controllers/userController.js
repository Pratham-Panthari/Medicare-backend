const Users = require('../models/User')

const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await Users.findByIdAndUpdate(id, { $set: req.body }, { new: true })

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

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await Users.findByIdAndDelete(id)

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

const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await Users.findById(id)

        res.status(200).send({
            status: 'success',
            message: 'User fetched Successfully',
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

const getAllUser = async (req, res) => {
    try {


        const users = await Users.find({})

        res.status(200).send({
            status: 'success',
            message: 'User Updated Successfully',
            users
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

module.exports = { updateUser, deleteUser, getSingleUser, getAllUser }