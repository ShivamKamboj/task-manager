const sequelize = require('sequelize')
    //database
const db = require("../config/database")

const Task = db.define(
    'task', {
        // title: {
        //     type: sequelize.STRING
        // },
        // description: {
        //     type: sequelize.STRING
        // },
        // due_date: {
        //     type: sequelize.DATE
        // },
        // priority: {
        //     type: sequelize.STRING
        // },
        // status: {
        //     type: sequelize.STRING
        // }
        // title for each task, should be string and null should be false
        title: {
            type: sequelize.STRING,
            allowNull: false
        },
        // description for each task, should be string and can be null too
        description: {
            type: sequelize.STRING,
            allowNull: true
        },
        // due date for each task, should be date and by default should be next date
        duedate: {
            type: sequelize.DATEONLY,
            allowNull: false,
        },

        /** 
         * priority for each task, should be string and 
         * by default set the value by medium and 
         * can have HIGH, LOW, MEDIUM
         */
        priority: {
            type: sequelize.ENUM,
            values: ['HIGH', 'MEDIUM', 'LOW'],
            defaultValue: 'MEDIUM',
            validate: {
                isIn: [
                    ["LOW", "MEDIUM", "HIGH"]
                ]
            }
        },
        // status for each task, should be boolean and by default should be false
        status: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        }
    })

module.exports = Task;