const { Router } = require('express');
const converser = require('./routes/converser');

module.exports = () => {
    const app = Router();
    converser(app);

    return app;
};
