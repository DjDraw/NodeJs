const User = require('../model/sequelize/user').user;
const sql = require('../model/sql/sql.js');
const query = require('../model/sql/query.js');
const seq238 = require('../model/sequelize/config.js').srv238;
const seq53 = require('../model/sequelize/config.js').srv53;
const isLoggedIn = require("../middlewares/session");
const request = require("request");

module.exports = (app) => {

    app.get('/', isLoggedIn, (req, res) => {
        res.render('index');
    });

    //jobs
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
    
    //CLARO
    app.get("/campaign/claro", isLoggedIn, (req, res) => {
        res.render("campaign/claro");
    });

    app.post("/campaign/claro", isLoggedIn, (req, res) => {
        seq238.query(query.findClaro,
            { replacements: [req.body.document], type: seq238.QueryTypes.SELECT }
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

    app.post("/campaign/claro/update", isLoggedIn, (req, res) => {
        var control = ["campo8","mail","localidad","estado"];
        if(control.indexOf(req.body.slcFields) > -1){
            seq238.query("UPDATE AvCLARO.dbo.Ventas SET " + req.body.slcFields + " = ? WHERE documento = ?",
            { replacements: [req.body.value,req.body.id], type: seq238.QueryTypes.UPDATE }
            ).spread((result, metadata) => {
                if(metadata > 0){
                    res.render("campaign/claro", {
                        msgSuccess: "Se realizo la modificacion correctamente."
                    });
                }else{
                    res.render("campaign/claro", {
                        msg: "No se modifico ningun registro."
                    });
                }
            })
        }else{
            res.render("campaign/claro", {
                msg: "Campo a modificar no valido."
            });
        }
    });

    //UCM
    app.get("/campaign/ucm", isLoggedIn, (req, res) => {
        res.render("campaign/ucm");
    });

    app.post("/campaign/ucm", isLoggedIn, (req, res) => {
        seq238.query(query.findUcm,
            { replacements: [req.body.doc], type: seq238.QueryTypes.SELECT }
        ).then(ventas => {
            if(ventas.length <= 0){
                return res.render("campaign/ucm",{
                    msg: "El documento no existe."
                });
            }else{
                res.render("campaign/ucm",{
                    data:ventas
                });
            }
        })
    });

    app.post("/campaign/ucm/update", isLoggedIn, (req, res) => {
        var control = ["1","3","4"];
        if(control.indexOf(req.body.slcStatus) > -1){
            var contrato = "%"+req.body.contract+"%"
            seq238.query(query.updateUcm,
                { replacements: [req.body.slcStatus,contrato], type: seq238.QueryTypes.UPDATE }
            ).spread((result, metadata) => {
                if(metadata > 0){
                    res.render("campaign/ucm", {
                        msgSuccess: "Se realizo la modificacion correctamente."
                    });
                }else{
                    res.render("campaign/ucm", {
                        msg: "No se modifico ningun registro."
                    });
                }
            })
        }else{
            res.render("campaign/ucm", {
                msg: "Estado Incorrecto."
            });
        }
    });
};