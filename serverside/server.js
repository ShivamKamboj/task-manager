const express = require("express")
const path = require('path')
    //database
const db = require("./config/database")
    //router
const routes = require("./routers/routerCPU")

var app = express()

express.urlencoded({ extended: true })
app.use(express.json())

//connect to clientside
app.use('/', express.static(path.join(__dirname, '../clientside')))

//allow operations over database
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(routes.task)
app.use(routes.note)


const PORT = process.env.PORT || 6556;

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