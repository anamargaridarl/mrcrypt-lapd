const browserObject = require('./browser');
const scraperController = require('./pageController');
const fs = require('fs');
const schedule = require('node-schedule');
const redisClient = require('../redis/redisClient');

const readTopRedditsFile = () => {
    let topReddits;
    try {
        topReddits = fs.readFileSync('src/assets/topReddits.json', 'utf8');
    } catch (error) {
        console.log(error);
    }

    return JSON.parse(topReddits);
};

const scrapeTopSubreddits = async () => {
    let subreddits;
    try {
        const topReddits = readTopRedditsFile();
        // Start the browser and create a browser instance
        const browserInstance = browserObject.startBrowser();
        // Pass the browser instance to the scraper controller
        subreddits = await scraperController(browserInstance, topReddits);
    } catch (error) {
        console.log(error);
    }

    return subreddits;
};

const getTopSubreddits = async () => {
    const subreddits = await scrapeTopSubreddits();
    await redisClient.setAsync('topSubreddits', JSON.stringify(subreddits));
};

module.exports = () => {
    getTopSubreddits();
    schedule.scheduleJob('*/10 * * * *', getTopSubreddits);
};
