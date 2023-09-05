const express = require('express')

const password = require('../controllers/passwordController')

const router = express.Router()

router.post('/addPassword', password.addPassword)
router.get('/listPasswords', password.listPasswords)
router.post('/editPassword/:passwordId', password.editPassword)
router.delete('/removePassword/:passwordId', password.removePassword)
router.post('/passwordDetails/:passwordId', password.passwordDetails)

module.exports = router
