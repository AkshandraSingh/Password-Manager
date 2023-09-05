const express = require('express')

const passwordRouter = require('./passwordRoutes')

const commonRouter = express.Router()

commonRouter.use('/passwords', passwordRouter)

module.exports = commonRouter
