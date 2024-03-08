const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    numberOfYes: {
        type: Number,
        default: 0
    },
    numberOfNo: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Question', questionSchema);
