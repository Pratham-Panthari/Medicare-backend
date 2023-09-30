const Users = require('../models/User')
const Doctor = require('../models/Doctors')
const { hashedPassword, comparePassword } = require('../helpers/authHelpers')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const register = async (req, res) => {
    try {
        const { email, password, name, phno, photo, role, gender } = req.body
        if(!email){
            return res.status(400).send({ Message: 'Email is required !' })
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(500).send({status: 'failed', message: 'Email invalid'})
        } 
        if(!password){
            return res.status(400).send({ Message: 'Password is required !' })
        }
        if(password.length <5 || password.length >25){
            return res.status(500).send({status: 'failed', message: 'Password must be 5-25 characters long'})
        } 
        if(!name){
            return res.status(500).send({status: 'failed', message: 'name is required'})
        }

        if(role === 'paitent'){
            const existingEmail = await Users.findOne({ email })
            if(existingEmail){
                return res.status(400).send({ messsage: 'Email already exists. Please login' })
            }
        }
        if(role === 'doctor'){
            const existingEmail = await Doctor.findOne({ email })
            if(existingEmail){
                return res.status(400).send({ messsage: 'Email already exists. Please login' })
            }
        }
        
        const hashPass = await hashedPassword(password)

        if(role === 'paitent'){
            const user = await Users.create({ email, password: hashPass, name, phno, photo, role, gender  })
            res.status(200).send({
                status: 'success',
                message: 'User created successfully',
                user
            })
        }

        if(role === 'doctor'){
            const doctor = await Doctor.create({ email, password: hashPass, name, phno, photo, role, gender  })
            res.status(200).send({
                status: 'success',
                message: 'User created successfully',
                doctor
            })
        }


    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}
const login = async (req, res) => {
    try {

        const { email, password } = req.body

        let user = null

        const paitent = await Users.findOne({ email })
        const doctor = await Doctor.findOne({ email })

        if(paitent){
            user = paitent
        }
        if(doctor){
            user = doctor
        }

        if(!user){
            return res.status(400).send({ message: 'User does not exists, please sign-in to continue' })
        }

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).send({status: 'failed', message: "Email or Password invalid !"})
        }

        const JWT_KEY = process.env.JWTSECRETKEY
        const token = await JWT.sign({ _id: user._id }, JWT_KEY, { expiresIn: '1d' })

        res.status(200).send({
            status: 'success',
            message: 'Login Successfull',
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}



module.exports = { register, login }