const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    let session = req.session;

    if(!session.userid) return res.redirect('/')
    
    res.status(200).sendFile(path.resolve('src/public/doc/doc-dashboard.html'))
});

module.exports = router;