const bcrypt = require('bcrypt');
const copyPaste = require('copy-paste');


const passwordModel = require('../models/passwordModel')

const mainPassword = 'IshanSingh1234'
module.exports = {
    addPassword: async (req, res) => {
        try {
            const { appPassword, passwordName, password } = req.body;
            if (appPassword !== mainPassword) {
                return res.status(401).send({
                    success: false,
                    message: "App password is incorrect."
                });
            }
            const isPasswordNameExist = await passwordModel.findOne({
                passwordName: passwordName
            });
            if (isPasswordNameExist) {
                return res.status(400).send({
                    success: false,
                    message: "Password name already exists in the database."
                });
            }
            const passwordData = new passwordModel(req.body);
            const bcryptPassword = await bcrypt.hash(password, 10);
            passwordData.password = bcryptPassword;
            passwordData.passwordHistory.push(bcryptPassword);
            await passwordData.save();
            return res.status(201).send({
                success: true,
                message: "Password added successfully!",
                data: passwordData
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Error occurred while adding the password.",
                error: error.message
            });
        }
    },

    listPasswords: async (req, res) => {
        try {
            const passwordsData = await passwordModel.find().select('passwordName password')
            const passwordCount = await passwordModel.find().select('passwordName password').count()
            res.status(200).send({
                success: true,
                message: "All passwords data found!",
                passwordCount: passwordCount,
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
                    if (passwordData.passwordHistory.includes(newPassword)) {
                        return res.status(401).send({
                            success: false,
                            message: "You can't use used passwords"
                        })
                    }
                    const bcryptPassword = await bcrypt.hash(newPassword, 10)
                    passwordData.password = bcryptPassword
                    passwordData.passwordHistory.push(newPassword)
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
    },

    removePassword: async (req, res) => {
        try {
            const { passwordId } = req.params
            const appPassword = req.body.appPassword
            if (appPassword === mainPassword) {
                const removerPasswordData = await passwordModel.findByIdAndDelete(passwordId);
                res.status(200).send({
                    success: true,
                    message: "Password has been removed successfully!"
                })

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
    },

    passwordDetails: async (req, res) => {
        try {
            const { passwordId } = req.params;
            const appPassword = req.body.appPassword;
            if (appPassword === mainPassword) {
                const passwordData = await passwordModel.findById(passwordId);
                const actualPassword = passwordData.passwordHistory[passwordData.passwordHistory.length - 1];
                copyPaste.copy(actualPassword, () => {
                    return res.status(200).send({
                        success: true,
                        message: "Password is copied to clipboard."
                    });
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: "App password is incorrect."
                });
            }
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Error occurred while retrieving the password.",
                error: error.message
            });
        }
    },
}
