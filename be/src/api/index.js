const { Router } = require('express');
const converser = require('./routes/converser');
const coinPage = require('./routes/coinPage');

module.exports = () => {
    const app = Router();
    converser(app);
    coinPage(app);

    return app;
};
