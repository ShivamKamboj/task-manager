//check for title authenticity
const valTitle = function validate(title) {
    return typeof title === 'string' && title.length > 0 ? true : false
}

const valFields = function validateField(userKey, dbFields) {
    const updates = userKey
    const allowedUpdates = dbFields
    const isValid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    return isValid
}


const valStatus = function validate(status) {
    if (status === 'true') {
        status = true
    } else if (status === 'false') {
        status = false
    } else {
        status = "Nothing"
    }
    return status
}

const valPriority = function validatePriority(priority) {
    if (typeof priority === 'undefined')
        return 'MEDIUM'

    priority = priority.toUpperCase();

    let priorities = ['LOW', 'MEDIUM', 'HIGH'];

    const val = priorities.filter((Element) => {
        return Element === priority
    })
    if (val.length > 0)
        return val;
    else
        return "Nothing";
}

module.exports = {
    validateTitle: valTitle,
    validateField: valFields,
    validateStatus: valStatus,
    validatePriority: valPriority
}