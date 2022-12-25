const { randomParseTextToArray, readTextToArray, parseTextData } = require("../../helper");
const randomScore = require("../../helper/randomScore");
const { delayRandomMs, delay, delayRandom, random } = require("../../until");
const changeNumberSearchFileTikTok = require("../helper/changeNumberSearchFileTikTok");
const randomParseTextToArrayTikTok = require("../helper/randomParseTextToArrayTikTok");
const addComments = require("./addComment");
const shareTikTok = require("./shareTikTok");



const addCommentDirectLink = async (page, { fileLink, fileComment, minDelayComment, maxDelayComment, minDelayShare, maxDelayShare, minTimeoutLive, maxTimeoutLive, maxComment, minDelayRefresh, maxDelayRefresh }) => {
    console.log("start addCommentDirectLink");
    await page.page.setDefaultNavigationTimeout(90000);
    await page.page.setViewport({ width: 1366, height: 768 });
    await delayRandomMs(200, 500);
    const link = await randomParseTextToArray(fileLink);

    const timeStop = (new Date()).getTime() + random(minTimeoutLive, maxTimeoutLive) * 1000;
    let timeStartCmt = (new Date()).getTime();
    let timeStartRefresh = (new Date()).getTime();
    let numberComment = 0;
    let refreshComment = 0;
    let delayComment = random(minDelayComment, maxDelayComment) * 1000;
    let timeShareFacebook = (new Date()).getTime();
    let delayShareFacebook = random(minDelayShare, maxDelayShare) * 1000;
    do {

        try {
            const timeNow = (new Date()).getTime();
          
            
            if (timeNow - timeStartRefresh > refreshComment) {
                 refreshComment = random(minDelayRefresh, maxDelayRefresh) * 1000;
                timeStartRefresh = (new Date()).getTime();
                await page.page.bringToFront();
                await page.goto(link[0]);
                await delayRandomMs(5000, 9000);
            }

            if (timeNow - timeShareFacebook > delayShareFacebook) {
                delayShareFacebook = random(minDelayShare, maxDelayShare) * 1000;
                timeShareFacebook = (new Date()).getTime();
                await shareTikTok(page, link[0]);
            }

            if (timeNow - timeStartCmt > delayComment) { 
                await page.page.bringToFront();
                timeStartCmt = (new Date()).getTime();
                delayComment = random(minDelayComment, maxDelayComment) * 1000;
                const comment = await randomParseTextToArrayTikTok(fileComment);
               // const lists = readTextToArray(fileComment);
               // const name = parseTextData(lists);
                //    if (numberComment <= name.length - 1) {
               //         const comment = name[numberComment]
                        if (comment) {
                        console.log(numberComment + " ." + comment[0]);
                        await addComments(page, comment[0]);
                        await changeNumberSearchFileTikTok(fileComment, comment);
                        await delayRandomMs(5500, 15000);
                        numberComment = numberComment + 1;
                        if (numberComment > maxComment) break;
                        }
                    //  await delayRandom(minDelayComment, maxDelayComment);
                }
            
            await delayRandomMs(3000, 6000);

        } catch (error) {
            console.log(error.message);
        }
       
    }
    while ((new Date()).getTime() < timeStop);
    console.log("end addCommentDirectLink");
}

module.exports = addCommentDirectLink