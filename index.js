const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectToDB = require('./db')
const servicesRoute = require('./routes/servicesRoute')
const authRoute = require('./routes/userRoute')
const faqRouter = require('./routes/faqRoute')
const appointmentRoutes = require('./routes/appointmentRoute')

dotenv.config()

connectToDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/services', servicesRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/faqs', faqRouter)
app.use('/api/v1/appointment', appointmentRoutes)

const PORT = process.env.PORT

app.listen (PORT, () => {
    console.log(`server running on port: ${PORT}`)
})