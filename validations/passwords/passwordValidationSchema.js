const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const userValSchema = {
    addPassword: joi.object({
        passwordName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(3)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .messages({
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
                'password.onlyLatinCharacters': '{#label} should contain only Latin characters',
            })
            .required(),
    }).unknown(true),
};

module.exports = userValSchema
