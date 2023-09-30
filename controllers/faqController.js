const Faq = require('../models/Faq')

const createFaq = async (req, res) => {
    try {
        const { question, answer } = req.body

        if(!question){
            return res.status(400).send({ message: 'Question is required' })
        }
        if(!answer){
            return res.status(400).send({ message: 'Answer is required' })
        }

        const faq = await Faq.create({ question, answer })
        res.status(200).send({
            status: 'Success',
            message: 'Faq created successfully',
            faq
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const getAllFaq = async (req, res) => {
    try {
        

        const faqs = await Faq.find({})
        res.status(200).send({
            status: 'Success',
            message: 'Faq created successfully',
            faqs
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const updateFaq = async (req, res) => {
    try {
        
        const id = req.params.id
        const faq = await Faq.findByIdAndUpdate(id, {$set: req.body}, { new: true })
        res.status(200).send({
            status: 'Success',
            message: 'Faq Updated successfully',
            faq
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const deleteFaq = async (req, res) => {
    try {
        
        const id = req.params.id
        const faq = await Faq.findByIdAndDelete(id)
        res.status(200).send({
            status: 'Success',
            message: 'Faq Deleted successfully',
            faq
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

module.exports = { createFaq, getAllFaq, updateFaq, deleteFaq  }