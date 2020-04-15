const createModelTask = function createModelTask(queryInterface, sequelize) {
    const Task = queryInterface.define('task', {
        //id for each task
        id: {
            type: sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.DataTypes.UUIDV4,
            allowNull: true
        },
        // title for each task, string and not-null
        title: {
            type: sequelize.STRING,
            allowNull: false
        },
        // description for each task, string and can be null
        description: {
            type: sequelize.STRING,
            allowNull: true
        },
        // due date for each task, should be date and by default should be next date
        duedate: {
            type: sequelize.DATEONLY,
            allowNull: false
        },
        // status for each task, should be boolean and by default false
        status: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        },
        /** 
         * priority for each task, should be string in:-
         * (HIGH, LOW, MEDIUM)
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
        }
    });
    return Task;
}

module.exports = {
    createTaskModel: createModelTask
}