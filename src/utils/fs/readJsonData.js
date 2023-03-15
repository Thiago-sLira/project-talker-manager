const path = require('path');
const fs = require('fs').promises;

const talkersPath = path.join(__dirname, '../../talker.json');

const readJsonData = async (pathname = talkersPath) => {
    try {
        const data = await fs.readFile(pathname);
        const dataJSON = JSON.parse(data);
        return dataJSON;
    } catch (error) {
        console.error(`Erro ao ler o arquivo: ${error}`);
    }
};

module.exports = readJsonData;
