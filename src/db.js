require('dotenv').config();

const mongoose = require('mongoose');


//models
const Doctor = require('./models/doctors');
const db = mongoose.connection;

db.once('open', function() {
    console.log("database connected!");
})

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

async function DoctorReg(req, res) {
    //add extra processing to create docid and validate some entries
    let id = Math.floor(Math.random() * Math.floor(1000000))
    let haveid = await Doctor.findOne({doc_id: id})
    if(haveid == null) {
        haveid = []
    }
    while(haveid.length > 0) {
        id = Math.floor(Math.random())
        haveid = await Doctor.findOne({doc_id: id})
    }

    console.log(`ID: ${id}`)

    //create db record
    let register = new Doctor({
        username: req.body.username,
        password: req.body.password,
        doc_id: id
    })

    try {
        register = await register.save();
        req.session.userid = id;
        res.redirect('/dashboard');
    } catch(error) {
        console.log(error);
        if(error.code == 11000) {
            error = `${error.keyValue.username} is already registered. Try a different one!`;
        }
        res.render('doc/doc-register', {account: register, error: error});
    }
}

async function DoctorFindByID(userid) {
    return await Doctor.findOne({doc_id: userid})
}

async function DoctorFindByUsername(username) {
    return await Doctor.findOne({username: username})
}



module.exports = {DoctorReg, DoctorFindByID, DoctorFindByUsername}