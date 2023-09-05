const passwordValidation = require('./passwordValidationSchema')

module.exports = {
    addPasswordValidation: async (req, res, next) => {
        const value = await passwordValidation.addPassword.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
