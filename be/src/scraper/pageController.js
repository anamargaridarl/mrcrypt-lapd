const pageScraper = require('./pageScraper');

const scrapeAll = async (browserInstance, topReddits) => {
    let browser;
    try {
        browser = await browserInstance;
        return pageScraper.scraper(browser, topReddits);
    } catch (err) {
        console.log('Could not resolve the browser instance => ', err);
        throw err;
    }
};

module.exports = (browserInstance, topReddits) => scrapeAll(browserInstance, topReddits);
