const express = require('express')

const password = require('../controllers/passwordController')

const router = express.Router()

router.post('/addPassword', password.addPassword)
router.get('/listPasswords', password.listPasswords)
router.post('/editPassword/:passwordId', password.editPassword)

module.exports = router
