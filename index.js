const express = require("express");
const path = require("path");
const passport = require("passport");
require('./passport-googleauth.js');
const session = require('express-session')

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(passport.initialize())
app.use(passport.session())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    res.render('home');
})

// app.get('/google',passport.authenticate('google',{scope:["profile","email"]}))

app.get('/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
app.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/success',
        failureRedirect: '/failure'
}));

app.get('/success',(req,res) => {
    res.render('success')
});

app.get("/logout", (req,res) => {
    console.log(req.session)
    req.logout((err) => {
        if (err) {
            return res.send('Could not log out');
        }
        req.session = null; // Clear the session
        res.redirect('/');
    });
    console.log('logout');
 })

app.listen(PORT,(err) => {
    if(err) console.log("Err listening on port",err);
    console.log(`successfully listening on http://localhost:${PORT}`);
})

// app.get('/success', (req, res) => {  res.redirect('/')  });