const readJsonData = require('../utils/fs/readJsonData');

const searchByName = async (req, res, next) => {
    const { q } = req.query;
    const talkersData = await readJsonData();
    if (!q) {
        return res.status(200).json(talkersData);
    }
    if (Number.isNaN(q)) {
        const talkersFiltered = talkersData.filter(({ name }) => name.includes(q));
        return res.status(200).json(talkersFiltered);
    }
    next();
};

module.exports = searchByName;