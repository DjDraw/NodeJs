const User = require('./model/sequelize/user').user;
const sql = require('./model/sql/sql.js');
const query = require('./model/sql/query.js');
const seq = require('./model/sequelize/config.js').config;
const isLoggedIn = require("./middlewares/session");

module.exports = (app, passport) => {

    app.get('/', isLoggedIn, (req, res) => {
        res.render('index');
    });

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

    app.get("/profile", isLoggedIn, (req, res) => {
        res.render("index");
        res.end();
    });

    app.get("/logout", (req, res) => {
        req.logout()
        res.redirect("/login");
    });

    app.get("/jobs", isLoggedIn, (req, res) => {
        sql.reporteria(query.jobs,function(data, err){
            if(err){
                res.writeHead(500,"Internal Error Ocurred",{"content-Type" : "text/html"});
                res.end();
            }
            else{
                res.render("jobs/index",{
                    data:data
                });
                res.end();
            }
        })
    });

    app.get("/campaign/claro", isLoggedIn, (req, res) => {
        res.render("campaign/claro");
    });

    app.post("/campaign/claro", isLoggedIn, (req, res) => {
        seq.query(query.findClaro,
            { replacements: [req.body.document], type: seq.QueryTypes.SELECT }
        ).then(ventas => {
            if(ventas.length <= 0){
                return res.render("campaign/claro",{
                    msg: "El documento no existe."
                });
            }else{
                res.render("campaign/claro",{
                    data:ventas
                });
            }
        })
    });
};