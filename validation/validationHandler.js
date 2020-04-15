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

module.exports = {
    validateTitle: valTitle,
    validateStatus: valStatus,
    validateField: valFields
}