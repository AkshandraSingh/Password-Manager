require('dotenv').config()
const express = require('express')

require('./config/modelConfig')
const mainRouter = require('./routes/mainRoutes')

const app = express()

app.use(express.json())
app.use('/', mainRouter)

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
