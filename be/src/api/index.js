const { Router } = require('express');
const converser = require('./routes/converser');
const socialMediaTrends = require('./routes/socialMediaTrends');

module.exports = () => {
    const app = Router();
    converser(app);
    socialMediaTrends(app);

    return app;
};