const { Router } = require('express');
const converser = require('./routes/converser');
const homepage = require('./routes/homepage');
const socialMediaTrends = require('./routes/socialMediaTrends');


module.exports = () => {
    const app = Router();
    converser(app);
    homepage(app);
    socialMediaTrends(app);
    return app;
};
