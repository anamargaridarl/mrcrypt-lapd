const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const validators = require('../middleware/validators/news');
const { Router } = require('express');
const router = Router();

const NEWS_PER_PAGE = 5;

module.exports = (app) => {
    app.use('/news', router);

    const requestConfig = {
        method: 'get',
        url: 'https://min-api.cryptocompare.com/data',
        headers: {
            authorization: `Apikey ${config.crypto_compare_api_key}`        },
    };

    /**
   * Retrieves cryptocurrencies news
   */
    router.get('/', validators.news, async (req, res, next) => {
        try {
            const newsUrl = `${requestConfig.url}/v2/news/`;
            const newsConfig = { ...requestConfig, url: newsUrl };
            newsConfig.params = {
                lang: 'EN',
                categories: req.query.categories || 'ALL_NEWS_CATEGORIES'
            };
            const response = await axios(newsConfig);
            const count = Math.ceil(response.data.Data.length / NEWS_PER_PAGE);
            const news = response.data.Data.slice((req.query.page - 1) * NEWS_PER_PAGE, (req.query.page * NEWS_PER_PAGE)).map((n) => ({
                url: n.url,
                title: n.title,
                content: n.body.length > 300 ? n.body.substring(0, 200) : n.body,
                extraContent: n.body.length > 300 ? n.body.substring(200) : '',
                image: n.imageurl,
                tags: n.categories.split('|')
            }));
            return res.status(HTTPStatus.OK).json({ count: count, data: news });
        } catch (err) {
            return next(err);
        }
    });

    /**
   * Retrieves cryptocurrencies news categories
   */
    router.get('/categories', async (_, res, next) => {
        try {
            const newsUrl = `${requestConfig.url}/news/categories`;
            const newsConfig = { ...requestConfig, url: newsUrl };
            const response = await axios(newsConfig);
            const categories = response.data.map((category) => category.categoryName);
            return res.status(HTTPStatus.OK).json(categories);
        } catch (err) {
            return next(err);
        }
    });
};
