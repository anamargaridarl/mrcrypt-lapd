const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const validators = require('../middleware/validators/coinPage');
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/coins', router);

    const requestConfigMarketCap = {
        method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v1',
        headers: {
            'X-CMC_PRO_API_KEY': config.cmc_api_key,
        },
    };

    /**
     * for the card of the fully dilluted marked cap
     */
    router.get('/market/:coinNames', validators.severalSymbols, async (req, res, next) => {

        try {
            const { coinNames } = req.params;
            const regex = /^(\w*,)*(\w+)$/gmi;
            const matchArray = coinNames.match(regex);
            if (matchArray === null) {
                throw new Error('Invalid coin list');
            }
            const names = coinNames.toUpperCase().split(',');

            const url = `${requestConfigMarketCap.url}/cryptocurrency/listings/latest`;
            const convertConfig = { ...requestConfigMarketCap, url: url };

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
    router.get('/:coinSymbol/coinEvolution', validators.coinSymbol, async (req, res, next) => {

        const date = new Date().getTime() / 1000;
        const oneYearAgo = new Date().setFullYear(new Date().getFullYear() - 1) / 1000;

        try {
            const { coinSymbol } = req.params;


            const params = {
                key: config.lunar_crush_api_key,
                data: 'assets',
                symbol: coinSymbol,
                interval: 'day',
                start: oneYearAgo,
                end: date,
                data_points: 365,
            };

            const configRequest = {
                method: 'get',
                url: 'https://api.lunarcrush.com/v2',
                params: params
            };

            const data = await axios(configRequest);

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
     * get market cap and volume, comparison made between last hour and 24h before that
     */
    router.get('/:coinSymbol/info', validators.coinSymbol, async (req, res, next) => {


        try {
            const { coinSymbol } = req.params;

            const params = {
                data: 'assets',
                symbol: coinSymbol,
                key: config.lunar_crush_api_key,
                data_points: 24,
                interval: 'hour'
            };

            const configRequest = {
                method: 'get',
                url: 'https://api.lunarcrush.com/v2',
                params: params
            };

            const data = (await axios(configRequest)).data.data[0];


            const [volumeYesterday, marketCapYesterday] = [data.timeSeries[0].volume, data.timeSeries[0].market_cap];
            const [volumeNow, marketCapNow] = [data.timeSeries[24].volume, data.timeSeries[24].market_cap];

            const volume = {
                value: volumeNow,
                percentage: volumeYesterday > volumeNow ? -(1 - (volumeNow / volumeYesterday)) : ((volumeNow / volumeYesterday) - 1) * 100
            };


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
    router.get('/:coinSymbol/price', validators.coinSymbol, async (req, res, next) => {
        try {
            const { coinSymbol } = req.params;
            const urlPriceCoin = `${requestConfigMarketCap.url}/cryptocurrency/quotes/latest?&symbol=${coinSymbol}`;
            const convertConfig = { ...requestConfigMarketCap, url: urlPriceCoin };

            const response = await axios(convertConfig);

            if (response.status !== 200) {
                return res.sendStatus(status);
            }

            const urlPriceEthNBtc = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD';

            const configRequest = {
                method: 'get',
                url: urlPriceEthNBtc,
                headers: {
                    Authorization: `Apikey ${config.crypto_compare_api_key}`

                }
            };

            const { status, data } = await axios(configRequest);

            if (status !== 200) {
                return res.sendStatus(status);
            }
            const price = response.data.data[coinSymbol.toUpperCase()].quote.USD.price;
            const bitcoinQuantity = coinSymbol.toUpperCase() === 'BTC' ? 1 : price / data.BTC.USD;
            const ethQuantity = coinSymbol.toUpperCase() === 'ETH' ? 1 : price / data.ETH.USD;


            return res.status(200).json ({ value: { price, bitcoinQuantity, ethQuantity } });
        } catch (error) {
            return next(error);
        }
    });

    /**
     * some stats regarding the coin, info in the right table
     */
    router.get('/:coinSymbol/stats', validators.coinSymbol, async (req, res, next) => {
        const PARAMSCryptoCompareAPI = ['average_transaction_value', 'block_height',
            'hashrate', 'difficulty', 'block_time', 'block_size', 'current_suply'];
        const PARAMSCoinMarketCapAPI = ['num_market_pairs', 'max_supply', 'circulating_supply', 'cmc_rank'];

        try {
            const { coinSymbol } = req.params;
            const url = `https://min-api.cryptocompare.com/data/blockchain/latest?fsym=${coinSymbol}`;

            const configRequest = {
                method: 'get',
                url: url,
                headers: {
                    Authorization: `Apikey ${config.crypto_compare_api_key}`

                }
            };

            const { status, data } = await axios(configRequest);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const responseProcessed = {};

            PARAMSCryptoCompareAPI.forEach((param) => {
                responseProcessed[param] = data.Data[param];
            });


            const urlListingCoins = `${requestConfigMarketCap.url}/cryptocurrency/listings/latest`;
            const convertConfig = { ...requestConfigMarketCap, url: urlListingCoins };

            const coinsData = await axios(convertConfig);

            if (status !== 200) {
                return res.sendStatus(status);
            }

            const dataFiltered = coinsData.data.data.filter((coin) => coinSymbol.toUpperCase() === coin.symbol.toUpperCase())[0];


            PARAMSCoinMarketCapAPI.forEach((param) => {
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
    router.get('/:coinName/coinInfo', validators.coinName, async (req, res, next) => {

        const PARAMS = ['slug', 'description', 'tags', 'name', 'symbol', 'logo'];

        try {
            const { coinName } = req.params;

            const url = `${requestConfigMarketCap.url}/cryptocurrency/info?slug=${coinName}`;
            const convertConfig = { ...requestConfigMarketCap, url: url };

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
