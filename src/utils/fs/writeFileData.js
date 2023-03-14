const fs = require('fs').promises;

const writeFileData = async (data, path) => {
    try {
        const dataJSON = JSON.stringify(data);
        await fs.writeFile(path, dataJSON);
    } catch (error) {
        console.error(`Erro ao ler o arquivo: ${error}`);
    }
};

module.exports = writeFileData;
