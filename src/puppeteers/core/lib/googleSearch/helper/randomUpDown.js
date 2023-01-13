const randomScore = require("../../helper/randomScore");

const randomUpDown = async (page, scoreDown, delay, step, loop) => {
    if (randomScore(scoreDown)) return await page.scrollRandDown(delay, step, loop);
    else return await page.scrollRandUp(delay, step, loop);
}
module.exports = randomUpDown