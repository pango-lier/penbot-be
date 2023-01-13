const { random } = require("../../until");
const findDomain = require("../helper/findDomain");
const switchPageHref = require("../helper/switchPageHref");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");
const processTargetDomain = require("./processTargetDomain");

const firstClickRandom = async (page, link, domain, config) => {
    try {
        await page.delayRandomMs(500, 1000);
        if (link.href.search(domain) >= 0) {
            await processTargetDomain(page, link, random(2, 8), 90, config);
            return true;
        } else {
            await processNegativeTargetDomain(page, link, random(2, 8), 87, config);
            // await page.page.waitForNavigation({ waitUntil: 'networkidle2' });

        }
        await switchPageHref(page, "https://www.google.com");
        return false;
    } catch (error) {
        console.log("Error firstClickRandom:" + error?.message || '');
    }
}

module.exports = firstClickRandom;