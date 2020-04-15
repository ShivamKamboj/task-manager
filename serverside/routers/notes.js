const express = require('express')
const controller = require('../controller/controllerCPU');
const validateFields = require('../validation/middleware');

const router = express.Router()

// Test routing
router.get("/test/note", controller.note.testNote)

// create notes
//router.post("/task/:id/note", controller.note.createNote)
router.post("/task/:id/note", validateFields.NoteInput, controller.note.createNote);

// fetch notes by Note Id
router.get("/task/:id/note/:noteId", controller.note.getNoteById)

// fetch notes by task id
router.get("/task/:id/note", controller.note.getNotes)

// delete notes
router.delete("/task/:id/note/:noteId", controller.note.deleteNote)

// deleteAll notes
router.delete("/task/:id/note", controller.note.deleteNotes)

// patch notes
//router.patch("/task/:id/note/:noteId", controller.note.updateNote)
router.patch("/task/:id/note/:noteId", validateFields.NoteUpdate, controller.note.updateNote);

module.exports = router