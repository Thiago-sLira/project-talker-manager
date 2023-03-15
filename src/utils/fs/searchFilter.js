const readJsonData = require('./readJsonData');

const searchFilter = async ({ q = '', rate = NaN, date = '' }) => {
    const talkersData = await readJsonData();
    const talkersFiltered = talkersData.filter((talker) => {
        '';

        return talker.name.includes(q)
            && (rate ? talker.talk.rate === Number(rate) : true)
            && (date ? talker.talk.watchedAt === date : true);
    });
    return talkersFiltered;
};

module.exports = searchFilter;