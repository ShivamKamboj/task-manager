const express = require("express")
    //const exphbs = require("express-handlebars")
    //const bodyParser = require("body-parser")
const path = require('path')
    //database
const db = require("./config/database")
    //router
const routes = require("./routers/routerCPU")

var app = express()

express.urlencoded({ extended: true })
app.use(express.json())

//connect to clientside
app.use('/',  express.static(path.join(__dirname,  '../clientside')))

//allow operations over database
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(routes.task)
app.use(routes.note)

//test db
// db.queryInterface.sync().then((res) => {
//     console.log("Connection..")
// }).catch((err) => {
//     console.log("Error")
// })
// db.authenticate()
//     .then(() => console.log("Connection worked"))
//     .catch((err) => console.error('Error :', err))

//this configures the node js application
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
// app.get('/', (req, res) => {
//     res.send('INDEX')
//         //res.send(todos)
// })

//taskmanager routes
//app.use('/tasks', require('./routers/tasks'))

const PORT = process.env.PORT || 6556;
//to start the application
//app.listen(PORT, console.log(`Server started on port ${PORT}`))

(async function() {
    try {
        await db.queryInterface.sync()
        await app.listen(PORT, () => {
            console.log("Connection Established!")
        })
    } catch (error) {
        //yaha dekh issey aya msg
        console.error(error)
        console.log("Database error!")
    }
})()