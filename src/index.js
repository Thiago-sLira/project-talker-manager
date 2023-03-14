const express = require('express');
const talkerRouter = require('./routes/talkerRouter');
// const fs = require('fs').promises;
// const path = require('path');
// const readJsonData = require('./utils/fs/readJsonData');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// const talkersPath = path.join(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
