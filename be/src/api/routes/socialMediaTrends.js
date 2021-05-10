const HTTPStatus = require('http-status-codes');
const axios = require('axios');
const config = require('../../config/env');
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
};
