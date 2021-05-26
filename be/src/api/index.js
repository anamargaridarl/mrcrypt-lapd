const { Router } = require('express');
const converser = require('./routes/converser');
const news = require('./routes/news');
const homepage = require('./routes/homepage');
const socialMediaTrends = require('./routes/socialMediaTrends');
const coinPage = require('./routes/coinPage');


module.exports = () => {
    const app = Router();
    converser(app);
    homepage(app);
    socialMediaTrends(app);
    coinPage(app);
    socialMediaTrends(app);
    news(app);

    return app;
};
