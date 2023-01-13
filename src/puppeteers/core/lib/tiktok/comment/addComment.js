const randomScore = require("../../helper/randomScore");
const { delayRandomMs } = require("../../until");

const SELECTOR_COMMENT = 'div[placeholder="Add comment..."]';
const SELECTOR_COMMENT2 = 'div[placeholder="Thêm bình luận..."]';

const addComments = async (page, comment) => {
    const error = false;
    try {
        let selector = SELECTOR_COMMENT2
        if (await page.checkSelector(SELECTOR_COMMENT)) {
            selector = SELECTOR_COMMENT;
        }
        if (randomScore(30)) {
            await page.page.hover(selector);
            if (randomScore(30)) {
                await page.click(selector);
            }
        } else {
            await page.click(selector);
        }
        await delayRandomMs(300, 500);
        await page.input(comment);
        await delayRandomMs(500, 2000);
        await page.enter();
        await delayRandomMs(500, 5000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    return error;
}


module.exports = addComments