require('dotenv').config();

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const access = require('./routes/access');
const patient = require('./routes/patient');
const dashboard = require('./routes/dashboard');
const admin = require('./routes/admin');
const api = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// express and express-session
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'secretpassword',
    resave: true,
    saveUninitialized: true
}));
app.use(morgan('common'));

// routers
app.use('/access', access);
app.use('/dashboard', dashboard);
app.use('/ad', admin);
app.use('/patient', patient);
app.use('/api', api);

app.get('/', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.status(200).redirect('/dashboard');
    res.status(200).sendFile('/public/landingpage.html', {root: __dirname})
})

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

const db = mongoose.connection;

db.once('open', function() {
    console.log("database connected!");
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})