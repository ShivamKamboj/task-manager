const sequelize = require('sequelize')

const modelObject = require('../models/modelHandler')

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