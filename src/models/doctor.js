const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const saltRounds = 10;

const registerSchema = new mongoose.Schema({
    doc_id: {
        type: Number,
        required: true,
        uniue: true
    },
    fullname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    PRCID: {
        type: Number,
        required: false,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rpid: {
        type: String,
        required: false
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date()
    }
})

registerSchema.pre('validate', function(next) {
    if(this.password) {
        this.password = bcrpyt.hashSync(this.password, saltRounds)
    }

    if(this.firstname && this.lastname) {
        this.fullname = this.firstname + " " + this.lastname;
    }

    next();
})

module.exports = mongoose.model('doctors', registerSchema);