const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const saltRounds = 10;

const registerSchema = new mongoose.Schema({
    patient_id: {
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
    middleinitial: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel_number: {
        type: Number,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        default: null
    },
    assigned_doc: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date()
    },
    history_record: {
        type: Object,
        default: new Object,
    }
})

registerSchema.pre('validate', function(next) {
    if(this.firstname && this.lastname) {
        this.fullname = this.firstname + " " + this.lastname;
    }

    next();
})

module.exports = mongoose.model('Patient', registerSchema);