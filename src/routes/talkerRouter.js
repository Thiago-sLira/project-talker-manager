const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const validateAge = require('../middlewares/validadeAge');
const validateName = require('../middlewares/validateName');
const validateToken = require('../middlewares/validateToken');
const readJsonData = require('../utils/fs/readJsonData');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const validateId = require('../middlewares/validateId');
const validateSearchByRate = require('../middlewares/validateSearchByRate');
const validateSearchByDate = require('../middlewares/validateSearchByDate');
const searchFilter = require('../utils/fs/searchFilter');
const validateRateById = require('../middlewares/validateRateById');

const router = express.Router();

router.use(express.json());

const talkersPath = path.join(__dirname, '../talker.json');

router.get('/search',
    validateToken, validateSearchByRate, validateSearchByDate,
    async (request, response) => {
        const result = await searchFilter(request.query);
        return response.status(200).json(result);
    });

router.patch('/rate/:id', validateToken, validateRateById, async (request, response) => {
    const { id } = request.params;
    const { rate } = request.body;
    const talkersData = await readJsonData(talkersPath);

    for (let i = 0; i < talkersData.length; i += 1) {
        const currentTalker = talkersData[i];
        if (currentTalker.id === Number(id)) {
            currentTalker.talk.rate = rate;
        }
    }
    const talkersDataJSON = JSON.stringify(talkersData);
    await fs.writeFile(talkersPath, talkersDataJSON);

    return response.status(204).send();
});

router.get('/', async (_request, response) => {
    const talkersData = await readJsonData(talkersPath);
    if (talkersData.length > 0) return response.status(200).json(talkersData);
    return response.status(200).json([]);
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const talkersData = await readJsonData(talkersPath);
    const talkerFound = talkersData.find((talker) => talker.id === Number(id));

    if (talkerFound) return response.status(200).json(talkerFound);
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
    validateToken, validateAge, validateName, validateWatchedAt, validateRate,
    async (request, response) => {
        const { name, age, talk: { watchedAt, rate } } = request.body;
        const talkersData = await readJsonData(talkersPath);
        const newId = talkersData[talkersData.length - 1].id + 1;

        const newTalker = { id: newId, name, age, talk: { watchedAt, rate } };

        talkersData.push(newTalker);
        const talkersDataJSON = JSON.stringify(talkersData);
        await fs.writeFile(talkersPath, talkersDataJSON);

        return response.status(201).json(newTalker);
    });

router.put('/:id',
    validateToken, validateAge, validateName, validateWatchedAt, validateRate, validateId,
    async (request, response) => {
        const { id } = request.params;
        const { name, age, talk: { watchedAt, rate } } = request.body;
        const talkersData = await readJsonData(talkersPath);
        for (let i = 0; i < talkersData.length; i += 1) {
            const currentTalker = talkersData[i];
            if (currentTalker.id === Number(id)) {
                currentTalker.name = name;
                currentTalker.age = age;
                currentTalker.talk.watchedAt = watchedAt;
                currentTalker.talk.rate = rate;
            }
        }
        const talkersDataJSON = JSON.stringify(talkersData);
        await fs.writeFile(talkersPath, talkersDataJSON);
        const talkerFound = talkersData.find((talker) => talker.id === Number(id));

        return response.status(200).json(talkerFound);
    });

router.delete('/:id', validateToken, validateId, async (request, response) => {
    const { id } = request.params;
    const talkersData = await readJsonData(talkersPath);

    const talkersFiltered = talkersData.filter((talker) => talker.id !== Number(id));
    const talkersDataJSON = JSON.stringify(talkersFiltered);
    await fs.writeFile(talkersPath, talkersDataJSON);

    return response.status(204).send();
});

module.exports = router;
