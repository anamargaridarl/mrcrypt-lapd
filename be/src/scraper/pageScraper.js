const scraperObject = {
    url: 'https://subredditstats.com/',
    async scraper(browser) {
        const page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
    }
};

module.exports = scraperObject;
