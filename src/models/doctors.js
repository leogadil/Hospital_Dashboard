const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const saltRounds = 10;

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    prc_liscence_number: {
        type: Number,
        required: false
    },
    doc_id: {
        type: Number,
        required: true,
        uniue: true
    },
    rpid: {
        type: String,
        required: false
    }
})

registerSchema.pre('validate', function(next) {
    if(this.password) {
        this.password = bcrpyt.hashSync(this.password, saltRounds)
    }

    next();
})

module.exports = mongoose.model('doctors', registerSchema);