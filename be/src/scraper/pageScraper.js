const scraperObject = {
    url: 'https://subredditstats.com/',
    async scraper(browser, topReddits) {
        let result = [];
        try {
            const page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url);

            while (result.length < 10) {
                await page.waitForSelector('div.subreddit-list:nth-child(2)');
                await page.waitForSelector('div.subreddit-list:nth-child(2) > .footer-area > button');
                const rows = await page.evaluate(() =>
                    Array.from(
                        document.querySelectorAll('div.subreddit-list:nth-child(2) > .list-area > .list-wrapper > table > tbody > tr')
                    ).map((row) => ({
                        rank: row.querySelector('td:nth-child(1)').textContent,
                        name: row.querySelector('td:nth-child(2) > a > span').textContent,
                        increase: row.querySelector('td:nth-child(3)').textContent,
                    }))
                );

                result = rows.filter((subreddit) => topReddits.includes(subreddit.name));
                await page.click('div.subreddit-list:nth-child(2) > .footer-area > button');
            }

            return result;
        } catch (error) {
            console.log(error);
        }

        return result;
    }
};

module.exports = scraperObject;
