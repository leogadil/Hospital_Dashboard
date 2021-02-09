const express = require('express');
const router = express.Router();
const { DoctorReg, DoctorFindByUsername } = require('../db');
const bcrpyt = require('bcrypt');

router.get('/', (req, res) => {
    res.redirect('/')
})

router.get('/register', (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    res.status(200).render('doc/doc-register', {account: req.body, error: null});
})

router.post('/register', async(req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    if(req.body.password === req.body.confirm_password) {
        DoctorReg(req, res);
    } else {
        res.status(200).render('doc/doc-register', {account: req.body, error: "password mismatch"});
    }
})

router.get('/login', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');
    
    res.status(200).render('doc/doc-login', {account: req.body, error: null});
})

router.post('/login', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    const doc = await DoctorFindByUsername(req.body.username);

    if(doc) {
            let ispasswordmatch = bcrpyt.compareSync(req.body.password, doc.password);
            if(ispasswordmatch) {
                session.userid = doc.doc_id;
                res.redirect('/dashboard');
            } else {
                res.status(200).render('doc/doc-login', {account: req.body, error: "Incorrect Invalid"});
            }
    } else {
        res.status(200).render('doc/doc-login', {account: req.body, error: "Account Invalid"});
    }

})

router.get('/logout', (req, res) => {
    let session = req.session;
    if(session.userid) {
        session.userid = null
        res.redirect('/');
    }
})

module.exports = router;