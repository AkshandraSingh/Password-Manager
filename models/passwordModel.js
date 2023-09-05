const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    passwordName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordHistory: {
        type: [],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

passwordSchema.set('timestamps', true)

module.exports = mongoose.model('password', passwordSchema);
