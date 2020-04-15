const convertDate = function dateConvert(date) {
    if (typeof date === 'undefined')
        return false;
    var regEx = /^\d{4}-\d{2}-\d{2}$/
    if (!date.match(regEx))
        return false
    var d = new Date(date)
    var dNum = d.getTime();
    if (!dNum && dNum !== 0)
        return false
    return d.toISOString().slice(0, 10) === date;
}

module.exports = {
    dateConversion: convertDate
}