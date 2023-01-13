const randomScore = require("../../helper/randomScore");
const { delayRandomMs } = require("../../until");

const SELECTOR_COMMENT = 'span[data-e2e="like-icon"] svg';
const SELECTOR_COMMENT2 = 'div[data-e2e="browse-like-icon"]';

const clickTim2 = async (page, comment = '') => {
    const error = false;
    try {
        await delayRandomMs(800, 4000);
        let selector = SELECTOR_COMMENT;
        if (await page.checkSelector(SELECTOR_COMMENT2)) {
            selector = SELECTOR_COMMENT2;
        }
        if (randomScore(30)) {
            try {
                await page.page.hover("comment-list-target ass-dar");
                await page.checkSelector("none-target-error")
                await page.page.hover("tim-open-target");
                await delayRandomMs(1, 5);
                await page.checkSelector("trigger-save");
                await delayRandomMs(1, 5);
                await page.checkSelector('save-target');
                await page.page.hover("close-comment-target-next");
            } catch (error) {
            }
            await page.page.hover(selector);
        }
        const color = await page.getAttributeSelector(selector, 'fill');
        if (color === "#fff") {
            await page.click(selector);
        }
        await page.checkSelector("close-target-save");//
        await delayRandomMs(1000, 5000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    return error;
}


module.exports.clickTim2 = clickTim2

const clickTim = async (page, like = true) => {
    const error = false;
    try {
        await delayRandomMs(800, 4000);
        let selector = SELECTOR_COMMENT;
        if (await page.checkSelector(SELECTOR_COMMENT2)) {
            selector = SELECTOR_COMMENT2;
        }
        const color = await page.getAttributeSelector(selector, 'fill');
        const coloTrim = like === true ? "none" : "#fff";
        if (color === coloTrim) {
            await page.click(selector);
        }
        await delayRandomMs(1000, 5000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    return error;
}
module.exports.clickTim = clickTim