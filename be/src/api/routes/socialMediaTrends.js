const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
const googleTrends = require('google-trends-api');
const { Router } = require('express');
const router = Router();

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
};
