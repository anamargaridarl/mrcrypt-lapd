const { Router } = require('express');
const converser = require('./routes/converser');
const coinPage = require('./routes/coinPage');
const news = require('./routes/news');

module.exports = () => {
    const app = Router();
    converser(app);
    coinPage(app);
    news(app);

    return app;
};
