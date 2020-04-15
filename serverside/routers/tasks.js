const express = require('express')
const controller = require('../controller/controllerCPU');
const validateFields = require('../validation/middleware');

const router = express.Router()

// Test Routing
router.get("/test/task", controller.task.testTask)

// Post Request for all tasks
//router.post('/task', controller.task.createTask)
router.post('/task', validateFields.TaskInput, controller.task.createTask);


// get request on all tasks
router.get("/task", controller.task.getTask)

// get particular task by id
router.get('/task/:id', controller.task.getParticularTask)

// update particular task over id
//router.patch('/task/:id', controller.task.updateParticularTask)
router.patch('/task/:id', validateFields.TaskUpdate, controller.task.updateParticularTask);

// delete particular task over id
router.delete('/task/:id', controller.task.deleteParticularTask)

module.exports = router