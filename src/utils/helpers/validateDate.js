const validadeDate = (date) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
    const testedDate = dateRegex.test(date);
    return testedDate;
};

module.exports = validadeDate;