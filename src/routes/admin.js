const express = require('express');
const router = express.Router();
const { DoctorReg } = require('../db');

router.get('/', (req, res) => {
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.status(200).send("admin login page");
})

router.get('/logout', (req, res) => {
    res.status(200).send("logging out");
})

module.exports = router;