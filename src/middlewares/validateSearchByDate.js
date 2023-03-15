const validateDate = require('../utils/helpers/validateDate');

const validateSearchByDate = async (req, res, next) => {
    const { date } = req.query;
    if (date && !validateDate(date)) {
        return res.status(400).json({ 
            message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

module.exports = validateSearchByDate;