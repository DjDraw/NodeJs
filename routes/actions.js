const User = require('../model/sequelize/user').user;
const sql = require('../model/sql/sql.js');
const query = require('../model/sql/query.js');
const seq = require('../model/sequelize/config.js').config;
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

    app.post("/campaign/claro/update", isLoggedIn, (req, res) => {
        var control = ["Campo8","mail"];
        if(control.indexOf(req.body.slcFields) > 0){
            seq.query("UPDATE AvCLARO.dbo.Ventas SET " + req.body.slcFields + " = ? WHERE documento = ?",
            { replacements: [req.body.value,req.body.id], type: seq.QueryTypes.UPDATE }
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
        }
    });

    app.get("/ues", (req, res) => {
        request({
            url: 'https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=111&deploy=1&compid=3793234&h=aee98a6ad66f59c47416&callback=jQuery222003360050927664893_1539954679426&search=UES0001993776&_=1539954679428',
            json: true    

        }, function (error, response, body) {
    
            if (!error && response.statusCode === 200) {
                console.log(body);
            }
        });
    });
};