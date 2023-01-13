const switchPageHref = require("../../googleSearch/helper/switchPageHref");
const randomScore = require("../../helper/randomScore");
const { delayRandomMs } = require("../../until");

const SELECTOR_FACEBOOK = 'i[data-e2e="share-icon"]';
const SELECTOR_FACEBOOK2 = 'i[data-e2e="share-icon"]';
const LINK_FACEBOOK = "https://www.facebook.com/sharer/sharer.php";

const shareTikTok = async (page, link) => {
    console.log("start shareTikTok");
    const error = false;
    try {
        let selector = SELECTOR_FACEBOOK
        if (await page.checkSelector(SELECTOR_FACEBOOK2)) {
            selector = SELECTOR_FACEBOOK;
        }
        if (randomScore(100)) {
            await page.page.hover(selector);
            await delayRandomMs(500, 2000);
            await page.click(selector);
        } else {
            await page.click(selector);
        }
        await delayRandomMs(2000, 4000);
        await page.click(`a[href*="${LINK_FACEBOOK}"]`);
        await delayRandomMs(8000, 15000);
        const switchPage = await switchPageHref(page, LINK_FACEBOOK);
        page = switchPage.pup;
        await delayRandomMs(2000, 4000);
        await page.click(`button[name="__CONFIRM__"]`);
        await delayRandomMs(15000, 25000);
        await switchPageHref(page, link);
        await delayRandomMs(2000, 4000);
        //await page.page.close();
        console.log("end shareTikTok");
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    return error;
}


module.exports = shareTikTok