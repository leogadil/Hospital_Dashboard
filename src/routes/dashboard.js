const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let session = req.session;
    console.log(session.userid)

    if(!session.userid) return res.redirect('/')

    
    res.status(200).render('doc/doc-dashboard');
});

module.exports = router;