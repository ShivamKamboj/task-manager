const sequelize = require('sequelize')

const modelObject = require('../models/modelHandler')

// module.exports = new sequelize('taskmanager', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql',

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/taskmanager.db'
})

const task = modelObject.task.createTaskModel(db, sequelize)
const note = modelObject.note.createNoteModel(db, sequelize)

task.hasMany(note, {
    onDelete: 'CASCADE',
    hooks: true,
})

note.belongsTo(task)

module.exports = {
    queryInterface: db,
    task: task,
    note: note
}