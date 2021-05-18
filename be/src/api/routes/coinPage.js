const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const validators = require('../middleware/validators/converser');
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/coins', router);

    const requestConfig = {
        method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v1',
        headers: {
            'X-CMC_PRO_API_KEY': '259bdcab-8c38-42f6-aca3-6ac1af4a3236',
        },
    };

    router.get('/:coinName/data', async (req, res, next) => {

        const PARAMS = ['slug', 'description', 'tags', 'name', 'symbol', 'logo'];

        try {
            const { coinName } = req.params;

            const url = `${requestConfig.url}/cryptocurrency/info?slug=${coinName}`;
            const convertConfig = { ...requestConfig, url: url };

            const { data, status } = await axios(convertConfig);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const responseProcessed = {};

            PARAMS.forEach((param) => {
                responseProcessed[param] = data.data['1'][param];
            });

            return res.status(200).json({ value: responseProcessed });

        } catch (error) {
            return next(error);
        }

    });

};
