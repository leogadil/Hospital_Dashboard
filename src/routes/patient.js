const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.status(200).sendFile(path.resolve('src/public/patient/register.html'))
})

router.get('/0', (req, res) => {
    res.status(200).sendFile(path.resolve('src/public/patient/zero.html'))
})

module.exports = router;