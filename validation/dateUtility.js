const convertDate = function dateConvert(date) {
    let userDate = new Date(date)
    let tommorowDate
    if (userDate.toString() !== 'Invalid Date') {
        tommorowDate = userDate.setDate(userDate.getDate() + 1);
    } else {
        tommorowDate = null
    }
    return tommorowDate
}

module.exports = {
    dateConversion: convertDate
}