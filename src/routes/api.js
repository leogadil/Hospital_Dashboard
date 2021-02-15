const express = require('express');
const router = express.Router();

const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

router.use(function (req, res, next) {
    let session = req.session;

    if(!req.query.bypass) {
        if(!session.userid) return res.status(200).json({
            status: false,
            error: "Not enough permission"
        })
    }   

    next()
})

router.get('/', (req, res) => {
    res.status(200).send('API IS RUNNING')
})

router.get('/getall/doctors', async (req, res) => {
    const alldoctors = await Doctor.find();
    
    var cleaned_doctors = []
    alldoctors.forEach(data => {
        data.password = undefined;
        cleaned_doctors.push(data);
    })

    var response = {
        status: true,
        data: cleaned_doctors
    }

    res.status(200).json(response)
})

router.get('/getall/patients', async (req, res) => {
    const allpatients = await Patient.find();
    
    var cleaned_doctors = []
    alldoctors.forEach(data => {
        cleaned_doctors.push(data);
    })

    var response = {
        status: true,
        data: cleaned_doctors
    }

    res.status(200).json(response)
})

router.get('/getpatients/:value', async (req, res) => {
    const allpatients = await Patient.find({assigned_doc: req.params.value});
    
    var patients = []
    allpatients.forEach(data => {
        patients.push(data);
    })

    var response = {
        status: true,
        data: patients
    }

    res.status(200).json(response)
})

router.get('/patient/:id', async (req, res) => {
    console.log(req.params.id)
    const patient = await Patient.findOne({patient_id: req.params.id})
    res.status(200).json(patient)
})

router.get('/user/info', async (req, res) => {
    const doctor = await Doctor.findOne({doc_id: req.session.userid})
    doctor.password = undefined;
    res.status(200).json(doctor)
})



module.exports = router;