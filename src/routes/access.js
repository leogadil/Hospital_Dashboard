const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctors');
const bcrpyt = require('bcrypt');
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).redirect('/')
})

router.get('/register', (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    res.status(200).sendFile(path.resolve('src/public/doc/doc-register.html'))
})

router.post('/register', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    if(req.body.password === req.body.confirm_password) {
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

        //create db record
        let register = new Doctor({
            username: req.body.username,
            password: req.body.password,
            doc_id: id
        })

        try {
            register = await register.save();
            req.session.userid = id;
            res.status(200).json({
                status: true,
                redirect: '/dashboard',
                userid: id
            })
        } catch(error) {
            console.log(error);
            if(error.code == 11000) {
                error = `Username is already registered. Try a different one!`;
            }
            res.status(200).json({
                status: false,
                error: error
            })
        }
    } else {
        error = `Password didn't match.`;
        res.status(200).json({
            status: false,
            error: error
        })
    }
})

router.get('/login', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');
    
    res.status(200).sendFile(path.resolve('src/public/doc/doc-login.html'))
})

router.post('/login', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.redirect('/dashboard');

    const doc = await Doctor.findOne({username: req.body.username})

    if(doc) {
            let ispasswordmatch = bcrpyt.compareSync(req.body.password, doc.password);
            if(ispasswordmatch) {
                session.userid = doc.doc_id;
                res.status(200).json({
                    status: true,
                    redirect: '/dashboard',
                    userid: doc.doc_id
                })
            } else {
                error = "Account Invalid";
                res.status(200).json({
                    status: false,
                    error: error
                })
            }
    } else {
        error = "Account Invalid";
        res.status(200).json({
            status: false,
            error: error
        })
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