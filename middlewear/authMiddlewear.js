const JWT = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv')

dotenv.config()

const loginRequire = async (req, res, next) => {
    try {
        const verify = await JWT.verify(req.headers.authorization, process.env.JWTSECRETKEY)
        if(!verify){
            return res.status(400).send('Something Went Wrong Please try again later')
        }
        req.user = verify
        next()
    } catch (error) {
        res.status(500).send("Please login to continue")
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne(req.user._id)
        if(user.role !== 'admin'){
            return res.status(401).send('Unauthorized Access, Permission Denied')
        }
        else{
            next()
        }
    } catch (error) {
        res.status(500).send('Somthing went wrong')
    }
}

module.exports = { loginRequire, isAdmin }