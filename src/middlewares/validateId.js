const readJsonData = require('../utils/fs/readJsonData');

const validateId = async (req, res, next) => {
    const { id } = req.params;
    const talkersData = await readJsonData();
    const talkerFound = talkersData.find((talker) => talker.id === Number(id));
    if (!talkerFound) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    next();
};

module.exports = validateId;