const { findEmailInfo } = require("../helper");

const URL = "https://myaccount.google.com/email";

const getEmailInfo = async (page, file) => {
    console.log("--getEmailInfo");
    await page.goto(URL);
    await page.delay(7);
    const email = await page.getContentSelector('.OStShb > .K6ZZTd > .iAwpk > .GqRghe > .mMsbvc');
    return await findEmailInfo(file, email);
}

module.exports = getEmailInfo;