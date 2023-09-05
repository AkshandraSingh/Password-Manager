const bcrypt = require('bcrypt')

const passwordModel = require('../models/passwordModel')

const mainPassword = 'IshanSingh1234'
module.exports = {
    addPassword: async (req, res) => {
        try {
            const { appPassword, passwordName, password } = req.body
            if (appPassword === mainPassword) {
                const isPasswordNameExist = await passwordModel.findOne({
                    passwordName: passwordName
                })
                if (isPasswordNameExist) {
                    return res.status(401).send({
                        success: false,
                        message: "Password name is already exist in data base."
                    })
                }
                const passwordData = new passwordModel(req.body)
                const bcryptPassword = await bcrypt.hash(password, 10)
                passwordData.password = bcryptPassword
                passwordData.save()
                res.status(201).send({
                    success: true,
                    message: "Password is added successfully!",
                    passwordData: passwordData
                })
            }
            res.status(401).send({
                success: false,
                message: "App password is incorrect"
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    listPasswords: async (req, res) => {
        try {
            const passwordsData = await passwordModel.find({}).select('passwordName password');
            res.status(200).send({
                success: true,
                message: "All passwords data found!",
                passwordsData: passwordsData
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    editPassword: async (req, res) => {
        try {
            const { passwordId } = req.params
            const { appPassword, oldPassword, newPassword } = req.body
            const passwordData = await passwordModel.findById(passwordId)
            if (appPassword === mainPassword) {
                const isCorrectPassword = await bcrypt.compare(oldPassword, passwordData.password)
                if (isCorrectPassword) {
                    const bcryptPassword = await bcrypt.hash(newPassword, 10)
                    passwordData.password = bcryptPassword
                    passwordData.save()
                    res.status(200).send({
                        success: true,
                        message: "Password is successfully updated!",
                    })
                } else {
                    res.status(401).send({
                        success: false,
                        message: "oldPassword is incorrect!"
                    })
                }
            } else {
                res.status(401).send({
                    success: false,
                    message: "App password is incorrect!"
                })
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    }
}
