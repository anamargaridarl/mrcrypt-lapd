const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const { Router } = require('express');
const router = Router();
const globalParams = require("../../assets/globalMarketData.json");


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
            Authorization: 'Apikey ' + config.cc_api_key
        },
    };

    router.get('/global', async (req, res, next) => {
        try {
            const coinsUrl = `${requestConfigLunar.url}?data=global&key=APIKey&data_points=24`;
            const coinsConfig = { ...requestConfigLunar, url: coinsUrl };
            const response = await axios(coinsConfig);
            let count = 0;
            let values = globalParams.map((param) => {
                let i = 0;
                let value = response.data.data[param.parameter]
                let timestamp = response.data.data.timeSeries.map((element) => {
                    return { name: i++, pv: element[param.parameterTime] }
                })
                console.log(param)
                return { id: count++, tooltip: param.tooltip, name: param.name, value: value, timestamp: timestamp, type: param.type }
            })
            return res.status(HTTPStatus.StatusCodes.OK).json(values);
        }
        catch (err) {
            return next(err);
        }

    });

    router.get('/coinChart/:symbol/:name', async (req, res, next) => {
        try {
            const { symbol, name } = req.params
            let i = 0;
            const timeUrl = `${requestConfigCrypto.url}/histoday`;
            const timeConfig = { ...requestConfigCrypto, url: timeUrl };
            timeConfig.params = {
                fsym: symbol,
                tsym: 'USD',
                aggregate: 7,
                limit: 5
            }

            const imageUrl = `${requestConfigCoin.url}/cryptocurrency/info`;
            const imageConfig = { ...requestConfigCoin, url: imageUrl };
            imageConfig.params = {
                slug: name
            }

            const responseLogo = await axios(imageConfig);
            const response = await axios(timeConfig);
            let chartResponse = response.data.Data.Data.map((element) => {
                return { name: i++, pv: element.high }
            })
            let key = Object.keys(responseLogo.data.data)
            let imageUrlData = responseLogo.data.data[key[0]].logo
            let toSend = { data: chartResponse, imageUrl: imageUrlData }

            return res.status(HTTPStatus.StatusCodes.OK).json(toSend);
        } catch (err) {
            return next(err);
        }

    });

    /**
     * Retrieves table
     */
    router.get('/coinRanking', async (_, res, next) => {

        const getValues = async () => {
            const coinsUrl = `${requestConfigCoin.url}/cryptocurrency/listings/latest`;
            const coinsConfig = { ...requestConfigCoin, url: coinsUrl };
            coinsConfig.params = {
                limit: 15,
                sort: 'market_cap',
                sort_dir: 'desc'
            }
            const response = await axios(coinsConfig);
            let data = response.data.data
            let toSend = await data.map((element) => {
                return axios("http://localhost:8080/api/homepage/coinChart/" + element.symbol + "/" + element.slug)
                    .then(data => {
                        return {
                            slug: element.slug,
                            coin: element.name,
                            imageUrl: data.data.imageUrl,
                            price: element.quote.USD['price'],
                            twentyfour: element.quote.USD['percent_change_24h'],
                            seven: element.quote.USD['percent_change_7d'],
                            cap: element.quote.USD['market_cap'],
                            volume: element.quote.USD['volume_24h'],
                            data: data.data.data
                        }
                    })
                    .catch((err) => {
                        return next(err);
                    })

            })
            Promise.all(toSend).then((values) => {
                return res.status(HTTPStatus.StatusCodes.OK).json(values);
            }).catch((err) => {
                return next(err);
            })
        }

        try {
            getValues()
        } catch (err) {
            return next(err);
        }
    });


};