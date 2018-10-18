const localStrategy = require('passport-local').Strategy;
const seq = require('./config.js').config;
const User = require('./user.js').user;

module.exports = function (passport){

    passport.serializeUser(function(user, done){
        return done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        seq.query('SELECT TOP 1 * FROM users WHERE id = ?',
            { replacements: [id], type: seq.QueryTypes.SELECT }
            ).then(users => {
                if(users.length > 0){
                    return done(null, users);
                }else{
                    console.log(users);
                }
            })
    });

    //signUp
    passport.use('localSignup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done){
        seq.query('SELECT TOP 1 * FROM users WHERE username = ?',
            { replacements: [username], type: seq.QueryTypes.SELECT }
        ).then(users => {
            if(users.length > 0){
                return done(null, false, req.flash('signupMessage','El usuario ya existe.'));
            }else{
                User.create({
                    username: username,
                    password: User.generateHash(password),
                    status: 0
                }).then(newUser => {
                    return done(null, newUser);
                });     
            }    
        })
    }));

    //Login
    passport.use('localLogin', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done){
        seq.query('SELECT TOP 1 * FROM users WHERE username = ? AND status = 1',
            { replacements: [username], type: seq.QueryTypes.SELECT }
        ).then(users => {
            if(users.length < 0){
                return done(null, false, req.flash('loginMessage','El usuario no existe.'));
            }if (!User.validatePassword(password,users[0].password)){
                return done(null,false, req.flash('loginMessage', 'Contraseña incorrecta'));
            }
            return done(null, users[0]);
        })
    }));
}