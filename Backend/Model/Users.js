const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{

    }],
    token: String,
    hash: String,
    salt: String,
});

module.exports = mongoose.model('User', userSchema);
