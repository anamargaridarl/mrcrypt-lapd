const browserObject = require('./browser');
const scraperController = require('./pageController');
const fs = require('fs');

const readTopRedditsFile = () => {
    try {
        const topReddits = fs.readFileSync('src/assets/topReddits.json', 'utf8');
        return JSON.parse(topReddits);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getTopSubreddits = async () => {
    try {
        const topReddits = readTopRedditsFile();
        // Start the browser and create a browser instance
        const browserInstance = browserObject.startBrowser();
        // Pass the browser instance to the scraper controller
        const subreddits = await scraperController(browserInstance, topReddits);
        return subreddits;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = () => getTopSubreddits();
