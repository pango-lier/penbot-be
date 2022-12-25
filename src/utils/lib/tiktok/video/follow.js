const randomScore = require("../../helper/randomScore");
const { delayRandomMs } = require("../../until");

const SELECTOR = 'button[data-e2e="browse-follow"]';
const SELECTOR2 = 'button[data-e2e="browse-follow"]';


const follow2 = async (page, like = true) => {
    const error = false;
    try {
        console.log("start follow");
        await delayRandomMs(800, 4000);
        let selector = SELECTOR;
        if (await page.checkSelector(SELECTOR2)) {
            selector = SELECTOR2;
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
        const content = await page.getContentSelector(selector);
        if (like === true && !['Following', "Đang Follow"].includes(content)) {
            await page.click(selector);
        } else if (like === false && !['Follow'].includes(content)) {
            await page.click(selector);
        }
        await delayRandomMs(5000, 9000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    console.log("end follow");
    return error;
}
module.exports.follow = follow2

const follow = async (page, like = true) => {
    const error = false;
    try {
        console.log("start follow");
        await delayRandomMs(800, 4000);
        let selector = SELECTOR;
        if (await page.checkSelector(SELECTOR2)) {
            selector = SELECTOR2;
        }
        const content = await page.getContentSelector(selector);
        if (like === true && !['Following', "Đang Follow"].includes(content)) {
            await page.click(selector);
        } else if (like === false && !['Follow'].includes(content)) {
            await page.click(selector);
        }
        await delayRandomMs(5000, 9000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    console.log("end follow");
    return error;
}
module.exports.follow = follow