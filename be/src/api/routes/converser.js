const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const validators = require('../middleware/validators/converser');
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/converser', router);

    const requestConfig = {
        method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v1',
        headers: {
            'X-CMC_PRO_API_KEY': config.cmc_api_key,
        },
    };

    /**
    * Retrieves cryptocurrencies
    */
    router.get('/coins', async (_, res, next) => {
        try {
            const coinsUrl = `${requestConfig.url}/cryptocurrency/listings/latest`;
            const coinsConfig = { ...requestConfig, url: coinsUrl };
            coinsConfig.params = {
                sort: 'market_cap',
                sort_dir: 'desc',
                cryptocurrency_type: 'coins',
                limit: 15,
            };
            const response = await axios(coinsConfig);
            const coins = response.data.data.map((coin) => ({ name: coin.name, code: coin.symbol }));
            return res.status(HTTPStatus.StatusCodes.OK).json({ coins: coins });
        } catch (err) {
            return next(err);
        }
    });

    /**
    * Convert currencies
    */
    router.get('/convert', validators.convert, async (req, res, next) => {
        try {
            const { from, to, value } = req.query;
            const convertUrl = `${requestConfig.url}/tools/price-conversion`;
            const convertConfig = { ...requestConfig, url: convertUrl };
            convertConfig.params = {
                amount: value,
                symbol: from,
                convert: to,
            };
            const response = await axios(convertConfig);
            const converted = parseFloat(response.data.data.quote[to].price.toFixed(5));
            return res.status(HTTPStatus.StatusCodes.OK).json({ value: converted });
        } catch (err) {
            return next(err);
        }
    });
};
