const express = require('express');
const router = express.Router();
const path = require('path');
const Patient = require('../models/patient');

router.get('/', (req, res) => {
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.status(200).sendFile(path.resolve('src/public/patient/register.html'))
})

router.post('/register', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    //add extra processing to create docid and validate some entries
    let id = Math.floor(Math.random() * Math.floor(1000000))
    let haveid = await Patient.findOne({doc_id: id})
    if(haveid == null) {
        haveid = []
    }
    while(haveid.length > 0) {
        id = Math.floor(Math.random())
        haveid = await Patient.findOne({doc_id: id})
    }

    //create db record
    let register = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middleinitial: req.body.middleinitial,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        status: req.body.status,
        address: req.body.address,
        tel_number: req.body.tel_number,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        patient_id: id,
        assigned_doc: req.body.assigned_doc
    })

    console.log(register)

    try {
        register = await register.save();
        res.status(200).json({
            status: true,
            redirect: '/patient/success',
            patient_id: id
        })
    } catch(error) {
        console.log(error);
        if(error.code == 11000) {
            error = `This Patient is already in the database.`;
        }
        res.status(200).json({
            status: false,
            error: error
        })
    }
})

router.get('/0', (req, res) => {
    res.status(200).sendFile(path.resolve('src/public/patient/zero.html'))
})

router.get('/success', (req, res) => {
    res.status(200).json("Successfully registered.")
})

module.exports = router;