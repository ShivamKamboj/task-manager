// Middleware which will add the layer before API hit to each POST request
const validatorObject = require('./validationHandler')
const util = require('./dateUtility')

const validateFields = {
    TaskInput: async(req, res, next) => {
        try {
            const isTitleValid = validatorObject.validateTitle(req.body.title)
            if (!isTitleValid)
                return res.status(400).send({ failure: 'Title name not provided' })

            let isStatusValid = validatorObject.validateStatus(req.body.status)
            if (isStatusValid === "Nothing")
                return res.status(400).send({ failure: 'Status can be true or false only' })

            const date = util.dateConversion(req.body.duedate)
            if (!date)
                return res.status(400).send({ failure: 'Insert Correct Date YYYY-MM-DD' })

            const priority = validatorObject.validatePriority(req.body.priority)
            if (priority === "Nothing")
                return res.status(400).send({ failure: 'Priority can be low, medium, high only' })

            req.title = req.body.title
            req.status = req.body.status
            req.date = req.body.duedate
            req.priority = priority
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ error: 'Something went wrong!' })
        }
    },

    TaskUpdate: async(req, res, next) => {
        try {
            const isValidFields = validatorObject.validateField(Object.keys(req.body), ['duedate', 'priority', 'status'])

            if (!isValidFields) {
                return res.status(400).send({ failure: "Fields is missing" })
            }

            let isStatusValid = validatorObject.validateStatus(req.body.status)
            if (isStatusValid === "Nothing")
                return res.status(400).send({ failure: 'Status can be true or false only' })

            const date = util.dateConversion(req.body.duedate)
            if (!date)
                return res.status(400).send({ failure: 'Insert Correct Date YYYY-MM-DD' })

            const priority = validatorObject.validatePriority(req.body.priority)
            if (priority === "Nothing")
                return res.status(400).send({ failure: 'Priority can be low, medium, high only' })

            req.status = req.body.status
            req.date = req.body.duedate
            req.priority = priority

            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ error: 'Something went wrong!' })
        }
    },

    NoteInput: async(req, res, next) => {
        try {
            const isContentValid = validatorObject.validateTitle(req.body.content)
            if (!isContentValid)
                return res.status(400).send({ failure: 'Content not provided' })

            req.content = req.body.content
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ error: 'Something went wrong!' })
        }
    },

    NoteUpdate: async(req, res, next) => {
        try {
            const isValidFields = validatorObject.validateField(Object.keys(req.body), ['content'])

            if (!isValidFields)
                return res.status(400).send({ failure: "Wrong Fields" })

            req.content = req.body
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ error: 'Something went wrong!' })
        }
    }
}

module.exports = validateFields