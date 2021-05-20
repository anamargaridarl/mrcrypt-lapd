const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const validators = require('../middleware/validators/converser');
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/homepage', router);

    const requestConfig = {
        method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v1',
        headers: {
            'X-CMC_PRO_API_KEY': config.cmc_api_key,
        },
    };

    /**
    * Retrieves table
    */
    router.get('/coinRanking', async (_, res, next) => {
        let i = 0;
        try {
            const coinsUrl = `${requestConfig.url}/cryptocurrency/listings/latest`;
            const coinsConfig = { ...requestConfig, url: coinsUrl };
            coinsConfig.params = {
                limit: 15,
                sort: 'market_cap',
                sort_dir: 'desc'
            }
            const response = await axios(coinsConfig);
            let data = response.data.data
            let toSend = data.map((element) => {
                return {
                    id: i++,
                    coin: element.name,
                    imageUrl: element.name,
                    price: element.quote.USD['price'],
                    twentyfour: element.quote.USD['percentage_change_24h'],
                    seven: element.quote.USD['percent_change_7d'],
                    cap: element.quote.USD['market_cap'],
                    volume:  element.quote.USD['volume_24h'],
                    data: 
                    

                }
            })
            return res.status(HTTPStatus.StatusCodes.OK).json(response.data.data);
        } catch (err) {
            return next(err);
        }
    });


};
