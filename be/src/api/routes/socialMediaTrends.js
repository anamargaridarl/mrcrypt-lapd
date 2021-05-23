const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const validators = require('../middleware/validators/socialMediaTrends');
const googleTrends = require('google-trends-api');
const { Router } = require('express');
const dateConvert = require('../middleware/dateConverter');
const router = Router();
const scraper = require('../../scraper');


module.exports = (app) => {
    app.use('/social-media-trends', router);

    const requestConfig = {
        method: 'get',
        url: 'https://api.lunarcrush.com/v2',
        params: {
            key: config.lc_api_key,
        },
    };

    /**
    * Gets the daily top influencers
    */
    router.get('/influencers', async (_, res, next) => {
        try {
            const customParams = {
                data: 'influencers',
                days: 7,
                num_days: 1,
                limit: 7,
            };
            const coinsConfig = { ...requestConfig, params: { ...requestConfig.params, ...customParams } };
            const data = (await axios(coinsConfig)).data.data;
            const parsedResponse = data.map((item) => ({
                key: item.identifier,
                title: item.twitter_screen_name,
                imageSrc: item.profile_image,
                weightedRank: parseFloat(item.influencer_rank_average.toFixed(3)),
                engagementRank: parseFloat(item.engagement_rank.toFixed(3)),
                followerRank: parseFloat(item.followers_rank.toFixed(3)),
                postRank: parseFloat(item.volume_rank.toFixed(3)),
            }));
            return res.status(HTTPStatus.StatusCodes.OK).json({ influencers: parsedResponse });
        } catch (err) {
            return next(err);
        }
    });

    /**
     * Get the top 10 Cryptocurrency related searches
     */
    router.get('/topCryptoSearches', (_, res, next) => {
        googleTrends.relatedQueries({ keyword: 'cryptocurrency', category: 814 })
            .then((data) => {
                const results = JSON.parse(data).default.rankedList;
                const merged = results[0].rankedKeyword.map((item, i) => ({
                    ...item, rank: item.value, ...results[1].rankedKeyword[i]
                }));
                const parsed = merged.map((item) => ({ rank: item.rank, name: item.query, increase: item.value })).slice(0, 10);
                res.status(HTTPStatus.StatusCodes.OK).json({ results: parsed });
            })
            .catch((err) => {
                console.error(err);
                return next(err);
            });
    });

    /**
     * Get Coin's Interest Over Time in Google Searches
     * @param {*} coin - Name of the crypto coin to search for.
     * @param {*} location - Country code of the region to search in. If absent, default to worldwide. Maximum length is 3. Ex: US, PT, WW.
     * @param {*} timePeriod - Time interval to search for. Valid values: "last week", "last month", "last year", and "last decade".
     * @param {*} searchType - The kind of Google Search to make. Ex: "web search", "image", "news", "youtube", or "froogle".
     */
    router.get('/googleInterest', validators.googleInterest, (req, res, next) => {
        const { coin, location, timePeriod, searchType } = req.query;


        const params = {
            keyword: coin,
            category: 814,
            startTime: dateConvert(timePeriod),
            property: searchType ? searchType : 'web search',
        };
        if (location && location !== 'WW') params.geo = location;

        googleTrends.interestOverTime(params)
            .then((data) => {
                const results = JSON.parse(data).default.timelineData;
                const parsedResults = results.map((item) => ({ name: item.formattedTime, pv: item.value[0] }));
                res.status(HTTPStatus.StatusCodes.OK).json({ evolution: parsedResults });
            })
            .catch((err) => {
                console.error(err);
                return next(err);
            });
    });

    /**
     * Get the top 10 Cryptocurrency related subreddits growth
     */
    router.get('/topSubreddits', (_, res, next) => {
        scraper().then((data) => {
            res.status(HTTPStatus.StatusCodes.OK).json(data);
        }).catch((err) => {
            console.error(err);
            return next(err);
        });
    });
};
