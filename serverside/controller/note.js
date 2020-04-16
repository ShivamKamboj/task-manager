// Creating each routing service for Note
const dbObject = require('../config/database');
const { Op } = require('sequelize');

//testing router
exports.testNote = (req, res) => {
    res.status(200).send({ success: "Testing Notes Router! Success" })
}

// fetch notes by task id
exports.getNotes = async(req, res) => {
    const id = req.params.id
    try {
        const task = await dbObject.task.findByPk(id, { include: dbObject.note })
        if (task && task.notes.length > 0)
            return res.status(200).send(task.notes)
        else
            return res.status(204).send({ failure: "No note found" })
    } catch (error) {
        return res.status(400).send({ failure: "No note found" })
    }
}

//const validatorObject = require('../validation/validationHandler')
// create notes of particular task
exports.createNote = async(req, res) => {
    // const isContentValid = validatorObject.validateTitle(req.body.content)
    // if (!isContentValid)
    //     return res.status(400).send({ failure: 'Content not provided' })

    const id = req.params.id
    try {
        const note = await dbObject.note.create({
            taskId: id,
            content: req.content
        })
        return res.status(201).send({ success: 'New note added', data: note })
    } catch (err) {
        return res.status(400).send({ failure: 'Something inserted wrong' })
    }
}


// fetch notes by task id with note id
exports.getNoteById = async(req, res) => {
    const Taskid = req.params.id
    const NoteId = req.params.noteId
    try {
        const note = await dbObject.note.findOne({
            where:  {
                [Op.and]:  [
                    {  id: NoteId  } ,
                    {  taskId: Taskid }     
                ]
            }
        })
        if (note) {
            return res.status(200).send(note)
        } else {
            return res.status(404).send({ failure: "Note not found" })
        }
    } catch (error) {
        return res.send({ failure: "Sorry! you entered something wrong" })
    }
}

// update notes of particular task with particular id of note
exports.updateNote = async(req, res) => {
    const Taskid = req.params.id
    const NoteId = req.params.noteId
    try {
        const note = await dbObject.note.update(req.content, {
            where: {
                [Op.and]:  [
                    {  id: NoteId  } ,
                    {  taskId: Taskid }     
                ]
            }
        })
        if (note == 1)
            return res.status(200).send({ success: "Note was updated successfully." })
        else
            return res.send({ failure: `Cannot update Note with id=${NoteId}. Maybe Task was not found or body is empty!` });
    } catch (error) {
        return res.status(500).send({ failure: "Error updating Note with id=" + NoteId })
    }
}

// delete all notes 
exports.deleteNotes = async(req, res) => {
    const Taskid = req.params.id
    try {
        await dbObject.note.destroy({
            where: {  taskId: Taskid } 
        })
        return res.send({ success: "Notes deleted successfully" })
    } catch (error) {
        return res.send({ failure: "Notes with this id does not exist" })
    }
}

// delete note of taskid and noteid
exports.deleteNote = async(req, res) => {
    const Taskid = req.params.id
    const NoteId = req.params.noteId

    try {
        const deletedNote = await dbObject.note.destroy({
            where: {
                [Op.and]:  [
                    {  id: NoteId  } ,
                    {  taskId: Taskid }     
                ]
            }
        })
        if (deletedNote == 1)
            return res.send({ success: "Task was deleted successfully." })
        else
            return res.send({ message: `Cannot delete Task with id=${NoteId}. Maybe Task was not found!` })
    } catch (error) {
        return res.status(500).send({ failure: "Error deleting Task with id=" + NoteId })
    }
}