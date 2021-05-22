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

    /**
     * for the card of the fully dilluted marked cap
     */
    router.get('/market/:coinNames', async (req, res, next) => {

        try {
            const { coinNames } = req.params;
            const names = coinNames.toUpperCase().split(',');

            const url = `${requestConfig.url}/cryptocurrency/listings/latest`;
            const convertConfig = { ...requestConfig, url: url };

            const { data, status } = await axios(convertConfig);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const responseFilter = data.data.filter((coin) => names.includes(coin.symbol.toUpperCase()));

            const responseProcessed = {};

            responseFilter.forEach((coinFiltered) => {
                const { max_supply, total_supply, quote } = coinFiltered;
                const percentage = quote.USD.percent_change_24h;
                const fullyDilutedMarket = quote.USD.price * (max_supply === null ? total_supply : max_supply);
                responseProcessed [coinFiltered.symbol] = { percentage, value: fullyDilutedMarket };

            });

            return res.status(200).json({ value: responseProcessed });
        } catch (error) {
            return next(error);
        }


    });


    router.get('/:coinSymbol/statsEvolution', async (req, res, next) => {

        const date = new Date().getTime() / 1000;
        const oneYearAgo = new Date().setFullYear(new Date().getFullYear() - 1) / 1000;

        try {
            const { coinSymbol } = req.params;
            const params = {
                data: 'assets',
                symbol: coinSymbol,
                key: 'iods8h29itmw07nx6d6du',
                interval: 'day',
                start: oneYearAgo,
                end: date,
                data_points: 365,
            };

            const config = {
                method: 'get',
                url: 'https://api.lunarcrush.com/v2',
                params: params
            };

            const data = await axios(config);

            const values = [];

            data.data.data[0].timeSeries.forEach((coin) => {

                const data = new Date(coin.time * 1000);
                const dataFormatada = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`;

                values.push({
                    open: coin.open,
                    market_cap: coin.market_cap,
                    time: dataFormatada
                });
            });


            return res.json({ values: values });


        } catch (error) {
            return next(error);
        }

    });


    router.get('/info', async (req, res, next) => {


        // price * max_supply
        const info = ['market_cap', 'timeSeries', 'volume', 'price', 'max_supply'];

        try {
            const params = {
                data: 'assets',
                symbol: 'btc',
                key: 'iods8h29itmw07nx6d6du'
            };

            const config = {
                method: 'get',
                url: 'https://api.lunarcrush.com/v2',
                params: params
            };

            const data = await axios(config);

            console.log(data);

            return res.json({ data: data.data.data });


        } catch (error) {
            return next(error);
        }

    });

    router.get('/:coinSymbol/priceDay', async (req, res, next) => {
        try {

            const { coinSymbol } = req.params;
            const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinSymbol}&tsym=USD&limit=10`;

            const config = {
                method: 'get',
                url: url,
                headers: {
                    Authorization: 'Apikey fe8a657f41319b69760fee377170fa16fa7d07da1a2583b209b1baf059b0e631'

                },
            };

            const { status, data } = await axios(config);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const processed = { from: new Date(data.Data.TimeFrom * 1000), to: new Date(data.Data.TimeTo * 1000), values: [] };

            data.Data.Data.forEach((hourValues) => {
                processed.values.push({
                    time: new Date(hourValues.time * 1000),
                    high: hourValues.high,
                    low: hourValues.low,
                    volumeFrom: hourValues.volumefrom,
                    volumeTo: hourValues.volumeto
                });
            });


            return res.status(200).json ({ value: processed });


        } catch (error) {
            return next(error);
        }
    });

    router.get('/:coinSymbol/priceHistoryHour', async (req, res, next) => {

        try {

            const { coinSymbol } = req.params;
            const url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coinSymbol}&tsym=USD&limit=10`;

            const config = {
                method: 'get',
                url: url,
                headers: {
                    Authorization: 'Apikey fe8a657f41319b69760fee377170fa16fa7d07da1a2583b209b1baf059b0e631'

                },
            };

            const { status, data } = await axios(config);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const processed = { from: new Date(data.Data.TimeFrom * 1000), to: new Date(data.Data.TimeTo * 1000), values: [] };

            data.Data.Data.forEach((hourValues) => {
                processed.values.push({
                    time: new Date(hourValues.time * 1000),
                    high: hourValues.high,
                    low: hourValues.low,
                    volumeFrom: hourValues.volumefrom,
                    volumeTo: hourValues.volumeto
                });
            });


            return res.status(200).json ({ value: processed });


        } catch (error) {
            return next(error);
        }
    });


    router.get('/:coinSymbol/price', async (req, res, next) => {
        try {

            const { coinSymbol } = req.params;
            const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,${coinSymbol}&tsyms=USD`;

            const config = {
                method: 'get',
                url: url,
                headers: {
                    Authorization: 'Apikey fe8a657f41319b69760fee377170fa16fa7d07da1a2583b209b1baf059b0e631'

                }
            };

            const { status, data } = await axios(config);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const price = data[coinSymbol.toUpperCase()].USD;
            const bitcoinQuantity = data.BTC.USD / price;
            const ethQuantity = data.ETH.USD / price;


            return res.status(200).json ({ value: { price, bitcoinQuantity, ethQuantity } });
        } catch (error) {
            return next(error);
        }
    });

    router.get('/:coinSymbol/stats', async (req, res, next) => {
        const PARAMS = ['average_transaction_value', 'block_height', 'hashrate', 'difficulty', 'block_time', 'block_size', 'current_suply'];

        try {
            const { coinSymbol } = req.params;
            const url = `https://min-api.cryptocompare.com/data/blockchain/latest?fsym=${coinSymbol}`;

            const config = {
                method: 'get',
                url: url,
                headers: {
                    Authorization: 'Apikey fe8a657f41319b69760fee377170fa16fa7d07da1a2583b209b1baf059b0e631'

                }
            };

            const { status, data } = await axios(config);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const responseProcessed = {};

            PARAMS.forEach((param) => {
                responseProcessed[param] = data.Data[param];
            });


            return res.status(200).json ({ value: responseProcessed });
        } catch (error) {
            return next(error);
        }


    });

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
