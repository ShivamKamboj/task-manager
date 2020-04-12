const mysql=require("mysql")

//configuration for mysql database
var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"taskmanager",
    multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("connected")
    }
    else{
        console.error("Connection failed")
    }
})

module.exports=mysqlConnection