const browserObject = require('./browser');
const scraperController = require('./pageController');
const fs = require('fs');

const readTopRedditsFile = () => {
    try {
        const topReddits = fs.readFileSync('src/assets/topReddits.json', 'utf8');
        return JSON.parse(topReddits);
    } catch (error) {
        console.log(error);
    }

    return undefined;
};

const getTopSubreddits = () => {
    const topReddits = readTopRedditsFile();
    if (!topReddits) return;

    // Start the browser and create a browser instance
    const browserInstance = browserObject.startBrowser();
    // Pass the browser instance to the scraper controller
    scraperController(browserInstance);
};

getTopSubreddits();
