const validateAge = (age) => {
    const validate = Number.isInteger(age) && age >= 18;
    return validate;
};

module.exports = validateAge;
