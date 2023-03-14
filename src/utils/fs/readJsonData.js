const fs = require('fs').promises;

const readJsonData = async (path) => {
    try {
        const data = await fs.readFile(path);
        const dataJSON = JSON.parse(data);
        return dataJSON;
    } catch (error) {
        console.error(`Erro ao ler o arquivo: ${error}`);
    }
};

module.exports = readJsonData;
