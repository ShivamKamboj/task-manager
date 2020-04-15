const express = require("express")
    //const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require('path')
    //database
const db = require("./config/database")

var app = express()
app.use(express.json())


//test db
db.queryInterface.sync().then((res) => {
    console.log("Connection..")
}).catch((err) => {
    console.log("Error");
});
// db.authenticate()
//     .then(() => console.log("Connection worked"))
//     .catch((err) => console.error('Error :', err))


//     //this configures the node js application
// app.use(bodyParser.json())
//     //to use clientside
// app.use('/', express.static(__dirname + '/clientside'))

// //try for get post requests
// let todos = [{
//         titel: 'no1',
//         description: 'its first',
//         due_date: '2020-04-06',
//         priority: 'medium',
//         status: 'incomplete'
//     },
//     {
//         titel: 'no2',
//         description: 'its second',
//         due_date: '2020-04-16',
//         priority: 'low',
//         status: 'complete'
//     },
//     {
//         titel: 'no3',
//         description: 'its third',
//         due_date: '2020-04-26',
//         priority: 'high',
//         status: 'incomplete'
//     }
// ]

//creating route
app.get('/', (req, res) => {
    res.send('INDEX')
        //res.send(todos)
})

//taskmanager routes
app.use('/tasks', require('./routes/tasks'))

const PORT = process.env.PORT || 6556;
//to start the application
app.listen(PORT, console.log(`Server started on port ${PORT}`))