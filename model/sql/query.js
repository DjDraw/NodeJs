var Jobs = "SELECT TOP 10 sj.name, " +
"CONVERT(DATETIME, RTRIM(run_date)) + ((run_time / 10000 * 3600) + ((run_time % 10000) / 100 * 60) + (run_time % 10000) % 100) / (86399.9964) AS run_datetime,run_status,run_duration " +
"FROM msdb..sysjobhistory sjh " +
"LEFT JOIN msdb.dbo.sysjobs as sj ON sj.job_id = sjh.job_id " +
"JOIN (SELECT sj2.name as name2,MAX(CONVERT(DATETIME, RTRIM(sjh2.run_date)) + ((sjh2.run_time / 10000 * 3600) + ((sjh2.run_time % 10000) / 100 * 60) + (sjh2.run_time % 10000) % 100) / (86399.9964)) AS run_datetime2 " +
"FROM msdb..sysjobhistory sjh2 " +
"LEFT JOIN msdb.dbo.sysjobs as sj2 ON sj2.job_id = sjh2.job_id " +
"GROUP BY sj2.name) t2 ON sj.name = t2.name2 " +
"AND CONVERT(DATETIME, RTRIM(run_date)) + ((run_time / 10000 * 3600) + ((run_time % 10000) / 100 * 60) + (run_time % 10000) % 100) / (86399.9964) = t2.run_datetime2 " +
"WHERE sjh.step_id = 0 AND (sj.name LIKE 'BD_%' OR sj.name LIKE 'Todas%') ";

var findClaro = "SELECT * FROM AvCLARO.dbo.Ventas WHERE documento = ?";

var findUcm = "SELECT campo2 Contrato,CASE WHEN t2.id_register IS NULL THEN t1.id ELSE t2.id_register END Id," + 
" CASE WHEN t2.nombre IS NULL THEN t1.nombre ELSE t2.nombre END Nombre, " + 
" CASE WHEN t2.apellido IS NULL THEN t1.apellido ELSE t2.apellido END Apellido," + 
" CASE WHEN t2.doc IS NULL THEN t1.documento ELSE t2.doc END Documento " + 
" FROM [AvUCM].[dbo].[Ventas] as t1 " + " LEFT JOIN [AvUCM].[dbo].beteficiarios as t2 ON t1.id = t2.id_register WHERE documento = ?";

var updateUcm = "UPDATE AvUCM.dbo.Ventas SET estado = ?, fVenta = CAST(GETDATE() as date) WHERE campo2 LIKE ?";


module.exports = {
    jobs: Jobs,
    findClaro: findClaro,
    updateUcm: updateUcm,
    findUcm: findUcm
}