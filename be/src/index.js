const config = require('./config/env');
const setupLoaders = require('./loaders');
const express = require('express');
const port = process.env.PORT;
const app = express();
const startScraper = require('./scraper');

const startServer = async () => {
    await setupLoaders({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.info(`Listening on port ${port}`);
    });
};

startServer();
startScraper();

module.exports = app;
