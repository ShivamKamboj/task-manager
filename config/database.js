const sequelize = require('sequelize')

const model = require('../models/modelHandler')

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

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/taskmanager.db'
});

const task = model.task.createTaskModel(db, Sequelize);
const note = model.note.createNoteModel(db, Sequelize);

task.hasMany(note, {
    onDelete: 'CASCADE',
    hooks: true,
});

note.belongsTo(task);

module.exports = {
    queryInterface: db,
    task: task,
    note: note
};