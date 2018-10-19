const User = require('../model/sequelize/user').user;
const sql = require('../model/sql/sql.js');
const query = require('../model/sql/query.js');
const seq = require('../model/sequelize/config.js').config;
const isLoggedIn = require("../middlewares/session");
const request = require("request");

module.exports = (app, passport) => {

    //Signup
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('localSignup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //Login
    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post("/login", passport.authenticate('localLogin',{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get("/logout", (req, res) => {
        req.logout()
        res.redirect("/login");
    });
};