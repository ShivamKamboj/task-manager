const mysql=require("mysql")
const express=require("express")
const bodyParser=require("body-parser")

var app=express()
//this configures the node js application
app.use(bodyParser.json())

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

//to start the application
app.listen(3000)