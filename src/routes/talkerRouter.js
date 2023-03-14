const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const validateAge = require('../middlewares/validadeAge');
const validateName = require('../middlewares/validateName');
const validateToken = require('../middlewares/validateToken');
const readJsonData = require('../utils/fs/readJsonData');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();

router.use(express.json());

const talkersPath = path.join(__dirname, '../talker.json');

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

        return response.status(201).json([newTalker]);
    });

module.exports = router;
