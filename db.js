const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()



const URI = process.env.MONGODBURI

const connectToDB = async() => {
    mongoose.set('strictQuery', false)
   /*  mongoose.set('strictPopulate', false) */
    try {
        await mongoose.connect(URI, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

module.exports = connectToDB