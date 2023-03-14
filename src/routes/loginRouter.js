const express = require('express');

const router = express.Router();

router.use(express.json());

router.post('/', async (request, response) => {
    // const { email, password } = request.body;
    let token = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < 16; index += 1) {
        token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return response.status(200).json({ token });
});

module.exports = router;