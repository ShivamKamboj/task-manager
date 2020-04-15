const dbObject = require('../config/database')

// Creating each routing service for Task

exports.testTask = async(req, res) => {
    res.status(200).send({ success: "Testing Task Router! state:-Success" })
}

//create the task
exports.createTask = async(req, res) => {
    try {
        const task = await dbObject.task.create({
            title: req.title,
            description: req.body.description,
            duedate: req.date,
            priority: req.priority[0],
            status: req.status
        })
        return res.status(201).send({ success: 'New task added', data: task })
    } catch (err) {
        return res.status(400).send({ failure: 'Something wrong is inserted in body' })
    }
}

//get all tasks
exports.getTask = async(req, res) => {
    try {
        const tasks = await dbObject.task.findAll()
        if (tasks.length > 0)
            return res.status(200).send(tasks)
        else
            return res.status(200).send({ success: "No Task present" })
    } catch (error) {
        return res.status(404).send({ failure: "No Task found" })
    }
}

//get a perticular task by id
exports.getParticularTask = async(req, res) => {
    try {
        const task = await dbObject.task.findByPk(req.params.id)
        if (!task) {
            return res.status(404).send({
                failure: 'No Task found with id = ' + req.params.id,
            })
        }
        return res.status(200).send(task)
    } catch (error) {
        return res.status(400).send({ failure: 'Wrong Id or invalid Id' })
    }
}

//change a perticular task over it's id
exports.updateParticularTask = async(req, res) => {
    const id = req.params.id
    try {
        const task = await dbObject.task.update({
            duedate: req.date,
            status: req.status,
            priority: req.priority[0]
        }, {
            where: { id: id }
        })
        if (task == 1)
            return res.send({ success: "Task was updated successfully." })
        else
            return res.send({ failure: `Cannot update Task with id=${id}. Maybe Task was not found or body is empty!` })
    } catch (error) {
        return res.status(500).send({ failure: "Error updating Task with id=" + id })
    }
}

//delete a task over it's id
exports.deleteParticularTask = async(req, res) => {
    const id = req.params.id
    try {
        const deletedTask = await dbObject.task.destroy({
            where: { id: id }
        })
        if (deletedTask == 1)
            return res.send({ success: "Task was deleted successfully." })
        else
            return res.send({ message: `Cannot delete Task with id=${id}. Maybe Task was not found!` })
    } catch (error) {
        return res.status(500).send({ failure: "Error deleting Task with id=" + id })
    }
}