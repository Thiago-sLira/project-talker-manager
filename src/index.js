const express = require('express');
// const fs = require('fs').promises;
const path = require('path');
const readJsonData = require('./utils/fs/readJsonData');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkersPath = path.join(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkersData = await readJsonData(talkersPath);
  if (talkersData.length > 0) return response.status(200).json(talkersData);
  return response.status(200).json([]);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkersData = await readJsonData(talkersPath);
  const talkerFound = talkersData.find((talker) => talker.id === Number(id));

  if (talkerFound) return response.status(200).json(talkerFound);
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
