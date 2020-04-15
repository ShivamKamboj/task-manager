const createModelNote = function createModelNote(queryInterface, sequelize) {
    const Note = queryInterface.define('note', {
        // id for each task
        id: {
            type: sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.DataTypes.UUIDV4,
            allowNull: true
        },
        // content for notes, should be string and not-null
        content: {
            type: sequelize.STRING,
            allowNull: false
        },
    })
    return Note
}

module.exports = {
    createNoteModel: createModelNote
}