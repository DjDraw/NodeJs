var Jobs = "SELECT TOP 10 sj.name,CONVERT(DATETIME, RTRIM(run_date)) + ((run_time / 10000 * 3600) + ((run_time % 10000) / 100 * 60) + (run_time % 10000) % 100) / (86399.9964) AS run_datetime,run_status, run_duration FROM msdb..sysjobhistory sjh LEFT JOIN msdb.dbo.sysjobs as sj ON sj.job_id = sjh.job_id WHERE sjh.step_id = 0 AND sj.name LIKE 'BD_%' ORDER BY run_datetime DESC";

var findClaro = "SELECT * FROM AvCLARO.dbo.Ventas WHERE documento = ?"


module.exports = {
    jobs: Jobs,
    findClaro: findClaro
}