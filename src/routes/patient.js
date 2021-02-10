const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.status(200).send("new patient register");
})

module.exports = router;