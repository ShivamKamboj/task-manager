// const express=require("express")
// const bodyParser=require("body-parser")
// const mysqlConnection=require("./connection")

// var app=express()
// //this configures the node js application
// app.use(bodyParser.json())
// //to use clientside
// app.use('/',express.static(__dirname+'/clientside'))

// //try for get post requests
// let todos=[
//     {
//         titel:'no1',
//         description:'its first',
//         due_date:'2020-04-06',
//         priority:'medium',
//         status:'incomplete'
//     },
//     {
//         titel:'no2',
//         description:'its second',
//         due_date:'2020-04-16',
//         priority:'low',
//         status:'complete'
//     },
//     {
//         titel:'no3',
//         description:'its third',
//         due_date:'2020-04-26',
//         priority:'high',
//         status:'incomplete'
//     }
// ]

// app.get('/todos',(req,res)=>{
//     res.send(todos)
// })
// //to start the application
// app.listen(6555)