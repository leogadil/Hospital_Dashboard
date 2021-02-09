const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const access = require('./routes/access');
const dashboard = require('./routes/dashboard');
const admin = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// public folder 
app.use(express.static(__dirname + "/views"));

// express and express-session
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');
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

app.get('/', async (req, res) => {
    let session = req.session;
    if(session.userid) return res.status(200).redirect('/dashboard');
    res.render("landingpage")
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})