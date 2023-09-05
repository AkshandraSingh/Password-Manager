const mongoose = require('mongoose');

const logger = require('../utils/logger')

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
})

mongoose.connection.on('error', (error) => {
    console.log("Mongoose Error")
    console.log('Error: ', error)
    logger.log('error', `Mongoose error: ${error}`)
})
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!")
    logger.log('info', 'Mongoose is connected!')
})