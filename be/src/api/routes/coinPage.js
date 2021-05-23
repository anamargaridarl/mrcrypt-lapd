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

    /**
     * for the charts
     */
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

    /**
     * get market cap and volume, da update de hora a hora
     */
    router.get('/:coinSymbol/info', async (req, res, next) => {


        try {
            const { coinSymbol } = req.params;

            const params = {
                data: 'assets',
                symbol: coinSymbol,
                key: 'iods8h29itmw07nx6d6du',
                data_points: 24,
                interval: 'hour'
            };

            const config = {
                method: 'get',
                url: 'https://api.lunarcrush.com/v2',
                params: params
            };

            const data = (await axios(config)).data.data[0];

            console.log(data);


            const [volumeYesterday, marketCapYesterday] = [data.timeSeries[0].volume, data.timeSeries[0].market_cap];
            const [volumeNow, marketCapNow] = [data.timeSeries[24].volume, data.timeSeries[24].market_cap];

            const volume = {
                value: volumeNow,
                percentage: volumeYesterday > volumeNow ? -(1 - (volumeNow / volumeYesterday)) : ((volumeNow / volumeYesterday) - 1) * 100
            };

            console.log(data.timeSeries[24]);

            const marketCap = {
                value: marketCapNow,
                percentage: marketCapYesterday > marketCapNow ?
                    -(1 - (marketCapNow / marketCapYesterday)) : ((marketCapNow / marketCapYesterday) - 1) * 100

            };

            return res.json({ volume, marketCap });


        } catch (error) {
            return next(error);
        }

    });

    /**
     * coin price and comparison the btc and eth
     */
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
            const bitcoinQuantity = price / data.BTC.USD;
            const ethQuantity = price / data.ETH.USD;


            return res.status(200).json ({ value: { price, bitcoinQuantity, ethQuantity } });
        } catch (error) {
            return next(error);
        }
    });

    /**
     * some stats regarding the coin, info in the right table
     */
    router.get('/:coinSymbol/stats', async (req, res, next) => {
        const PARAMS = ['average_transaction_value', 'block_height', 'hashrate', 'difficulty', 'block_time', 'block_size', 'current_suply'];
        const PARAMS2 = ['num_market_pairs', 'max_supply', 'circulating_supply', 'cmc_rank'];
        // num_market_pairs, max_supply, circulating_supply, cmc_rank
        // percentage_change_7d, percentage_change_30d

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


            const url2 = `${requestConfig.url}/cryptocurrency/listings/latest`;
            const convertConfig = { ...requestConfig, url: url2 };

            const data2 = await axios(convertConfig);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const dataFiltered = data2.data.data.filter((coin) => coinSymbol.toUpperCase() === coin.symbol.toUpperCase())[0];


            PARAMS2.forEach((param) => {
                responseProcessed[param] = dataFiltered[param];
            });


            return res.status(200).json ({ value: responseProcessed });
        } catch (error) {
            return next(error);
        }


    });

    /**
     * some basic information regarding a coin (information in the top left)
     */
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
                for (const x in data.data) {
                    responseProcessed[param] = data.data[x][param];
                }
            });

            return res.status(200).json({ value: responseProcessed });

        } catch (error) {
            return next(error);
        }

    });

};
