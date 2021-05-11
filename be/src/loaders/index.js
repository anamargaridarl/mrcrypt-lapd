const expressLoader = require('./express');

const setupLoaders = async ({ expressApp }) => {
    await expressLoader(expressApp);
    console.info('Express initialized');
};

module.exports = setupLoaders;
