const express = require('express')

const password = require('../controllers/passwordController')
const passwordValidator = require('../validations/passwords/passwordValidator')

const router = express.Router()

router.post('/addPassword', passwordValidator.addPasswordValidation, password.addPassword)
router.get('/listPasswords', password.listPasswords)
router.post('/editPassword/:passwordId', password.editPassword)
router.delete('/removePassword/:passwordId', password.removePassword)
router.post('/passwordDetails/:passwordId', password.passwordDetails)
router.post('/passwordGenerator', password.passwordGenerator)

module.exports = router
