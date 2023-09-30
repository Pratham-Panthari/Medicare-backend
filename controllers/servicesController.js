const Services = require('../models/Services')

const createService = async (req, res) => {
    try {
        const { name, description } = req.body
        if(!name){
            return res.status(400).send({ message: 'Name is required' })
        }
        if(!description){
            return res.status(400).send({ message: 'Description is required' })
        }
        const exitingService = await Services.findOne({ name })
        if(exitingService){
            return res.status(400).send({ message: 'Service already exists' })
        }
        const service = await Services.create({ name, description })
        res.status(200).send({
            status: 'Success',
            message: 'Service Added successfully',
            service
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const getAllServices = async (req, res) =>{
    try {
        const services = await Services.find({})
        res.status(200).send({
            status: 'success',
            message: 'services fetched successfully',
            services
        }) 
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

module.exports = { createService, getAllServices }