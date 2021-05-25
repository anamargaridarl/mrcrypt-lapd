const { Router } = require('express');
const converser = require('./routes/converser');
const socialMediaTrends = require('./routes/socialMediaTrends');
const news = require('./routes/news');

module.exports = () => {
    const app = Router();
    converser(app);
    socialMediaTrends(app);
    news(app);

    return app;
};
