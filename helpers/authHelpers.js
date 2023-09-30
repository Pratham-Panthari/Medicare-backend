const bcrypt = require('bcryptjs')

const hashedPassword = async (password) => {
    try {
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log(error)
        return error
    }
}

const comparePassword = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword)
    } catch (error) {
        console.log(error)
        return error
    }
    
} 

module.exports = { hashedPassword, comparePassword }