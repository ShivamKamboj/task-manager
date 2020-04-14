//const mysql = require("mysql")

//configuration for mysql database
/*var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "taskmanager",
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (err) throw err
    console.log("Connection sucessful")
    var sql = "select * from task"

    mysqlConnection.query(sql,(err, result) => {
        if (err) throw err;
        console.log(result);
    })
})

module.exports = mysqlConnection
*/