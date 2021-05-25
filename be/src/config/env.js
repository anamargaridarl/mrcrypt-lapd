require('dotenv-flow').config();

module.exports = Object.freeze({
    port: process.env.PORT,
    cmc_api_key: process.env.CMC_API_KEY,
    crypto_compare_api_key: process.env.CRYPTO_COMPARE_API_KEY,
    lunar_crush_api_key: process.env.LUNAR_CRUSH_KEY
});
