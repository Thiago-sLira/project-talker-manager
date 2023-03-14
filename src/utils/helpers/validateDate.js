const validateDate = (date) => {
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const testedDate = dateRegex.test(date);
    return testedDate;
};

module.exports = validateDate;