const express = require('express')
const controller = require('../controller/controllerCPU');

const router = express.Router()

// Test routing
router.get("/test/note", controller.note.testNote)

// create notes
router.post("/task/:id/note", controller.note.createNote)

// fetch notes by Note Id
router.get("/task/:id/note/:noteId", controller.note.getNoteById)

// fetch notes by task id
router.get("/task/:id/note", controller.note.getNotes)

// delete notes
router.delete("/task/:id/note/:noteId", controller.note.deleteNote)

// patch notes
router.patch("/task/:id/note/:noteId", controller.note.updateNote)

// deleteAll notes
router.delete("/task/:id/note", controller.note.deleteNotes)

module.exports = router