const { Router } = require('express');
const converser = require('./routes/converser');
const news = require('./routes/news');

module.exports = () => {
    const app = Router();
    converser(app);
    news(app);

    return app;
};
