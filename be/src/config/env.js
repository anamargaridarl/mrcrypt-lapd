require('dotenv-flow').config();

module.exports = Object.freeze({
    port: process.env.PORT,
    cmc_api_key: process.env.CMC_API_KEY,
});
