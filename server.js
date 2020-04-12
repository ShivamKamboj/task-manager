const express=require("express")
const bodyParser=require("body-parser")
const mysqlConnection=require("./connection")

var app=express()
//this configures the node js application
app.use(bodyParser.json())

//to start the application
app.listen(6868)