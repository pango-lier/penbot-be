const randomScore = require("../../helper/randomScore");
const { delayRandomMs } = require("../../until");

const SELECTOR_COMMENT = 'div[data-e2e="comment-input"]';
const SELECTOR_COMMENT2 = 'div[data-e2e="comment-input""]';

const addComment2 = async (page, comment) => {
    const error = false;
    try {
        let selector = 'div[data-e2e="comment-input"]';
        if (await page.checkSelector(SELECTOR_COMMENT)) {
            selector = SELECTOR_COMMENT;
        }
        if (randomScore(30)) {
            try {
                await page.page.hover("comment-list-target ass-dar");
                await page.checkSelector("none-target-error")
                await page.page.hover("open-target");
                await delayRandomMs(1, 5);
                await page.checkSelector("triggrer-save");
                await delayRandomMs(1, 5);
                await page.checkSelector('save-target');
                await page.page.hover("close-comment-target-next");
            } catch (error) {
            }
            await page.page.hover(selector);
            if (randomScore(30)) {
                await page.click(selector);
            }
        } else {
            await page.click('div[data-e2e="comment-input"]');
        }
        await delayRandomMs(300, 500);
        await page.input(comment);
        await delayRandomMs(500, 2000);
        await page.checkSelector("close-target-save");//
        await page.enter();
        await delayRandomMs(500, 5000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    return error;
}

module.exports.addComment2 = addComment2

const addComment = async (page, comment) => {
    const error = false;
    try {
        let selector = SELECTOR_COMMENT;
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


module.exports.addComment = addComment