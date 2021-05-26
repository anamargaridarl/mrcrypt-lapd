const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const { Router } = require('express');
const router = Router();
const globalParams = require('../../assets/globalMarketData.json');
const validators = require('../middleware/validators/homepage');

module.exports = (app) => {
    app.use('/homepage', router);

    const requestConfigCoin = {
        method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v1',
        headers: {
            'X-CMC_PRO_API_KEY': config.cmc_api_key,
        },
    };

    const requestConfigLunar = {
        method: 'get',
        url: 'https://api.lunarcrush.com/v2',
        params: {
            key: config.lc_api_key,
        },
    };

    const requestConfigCrypto = {
        method: 'get',
        url: 'https://min-api.cryptocompare.com/data/v2',
        headers: {
            Authorization: `Apikey ${config.cc_api_key}`
        },
    };

    router.get('/global', async (_, res, next) => {
        try {
            const coinsUrl = `${requestConfigLunar.url}?data=global&key=APIKey&data_points=24`;
            const coinsConfig = { ...requestConfigLunar, url: coinsUrl };
            const response = await axios(coinsConfig);
            let count = 0;
            const values = globalParams.map((param) => {
                let i = 0;
                const value = response.data.data[param.parameter];
                const timestamp = response.data.data.timeSeries.map((element) => ({ name: i++, pv: element[param.parameterTime] }));
                return { id: count++, tooltip: param.tooltip, name: param.name, value: value, timestamp: timestamp, type: param.type };
            });
            return res.status(HTTPStatus.StatusCodes.OK).json(values);
        } catch (err) {
            return next(err);
        }

    });

    router.get('/coinChart/:symbol/:name', validators.coin, async (req, res, next) => {
        try {
            const { symbol, name } = req.params;
            let i = 0;
            const timeUrl = `${requestConfigCrypto.url}/histoday`;
            const timeConfig = { ...requestConfigCrypto, url: timeUrl };
            timeConfig.params = {
                fsym: symbol,
                tsym: 'USD',
                aggregate: 7,
                limit: 5
            };

            const imageUrl = `${requestConfigCoin.url}/cryptocurrency/info`;
            const imageConfig = { ...requestConfigCoin, url: imageUrl };
            imageConfig.params = {
                slug: name
            };

            const responseLogo = await axios(imageConfig);
            const response = await axios(timeConfig);
            const chartResponse = response.data.Data.Data.map((element) => ({ name: i++, pv: element.high }));
            const key = Object.keys(responseLogo.data.data);
            const imageUrlData = responseLogo.data.data[key[0]].logo;
            const toSend = { data: chartResponse, imageUrl: imageUrlData };

            return res.status(HTTPStatus.StatusCodes.OK).json(toSend);
        } catch (err) {
            return next(err);
        }

    });

    /**
     * Retrieves table
     */
    router.get('/coinranking', async (_, res, next) => {

        const getValues = async () => {
            const coinsUrl = `${requestConfigCoin.url}/cryptocurrency/listings/latest`;
            const coinsConfig = { ...requestConfigCoin, url: coinsUrl };
            coinsConfig.params = {
                limit: 15,
                sort: 'market_cap',
                sort_dir: 'desc'
            };
            const response = await axios(coinsConfig);
            const data = response.data.data;
            const toSend = data.map((element) => ({
                symbol: element.symbol,
                slug: element.slug,
                coin: element.name,
                price: element.quote.USD['price'],
                twentyfour: element.quote.USD['percent_change_24h'],
                seven: element.quote.USD['percent_change_7d'],
                cap: element.quote.USD['market_cap'],
                volume: element.quote.USD['volume_24h'],
            }));
            res.status(HTTPStatus.StatusCodes.OK).json(toSend).catch((err) => next(err));
        };

        try {
            getValues();
        } catch (err) {
            return next(err);
        }
    });


};
