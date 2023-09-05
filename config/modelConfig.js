const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/PasswordManager', {
    useNewUrlParser: true,
})

mongoose.connection.on('error', (error) => {
    console.log("Mongoose Error")
    console.log('Error: ', error)
})
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!")
})