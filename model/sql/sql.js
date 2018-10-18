var sql = require('mssql');
var config = require('./config');

exports.reporteria = function (query,callback){
    var conn = new sql.ConnectionPool(config.reporteria);
    conn.connect().then(()=>{
        var req = new sql.Request(conn);
        req.query(query)
        .then((result)=>{
            callback(result.recordset);
        })
        .catch((err)=>{
            console.log(err);
            callback(null,err);
        });
    })
    .catch((err)=>{
        console.log(err);
        callback(null,err);
    });
}