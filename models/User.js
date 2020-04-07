const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { SALT } = require('../config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    empresa: String
});

userSchema.statics.hash = async (p) => {
    return await bcryptjs.hash(p, SALT);
};

userSchema.statics.compare = async function (p, password) {
    return await bcryptjs.compare(p, password);
}

module.exports = mongoose.model('User', userSchema);