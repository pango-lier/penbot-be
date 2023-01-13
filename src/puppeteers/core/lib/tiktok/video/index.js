const { readTextParseToArray, changeNameFileSameFolder } = require("../../helper");
const { delayRandomMs } = require("../../until");
const { addComment } = require("./addComment");
const { clickTim } = require("./clickTim");
const { follow } = require("./follow");
const { shareTikTok } = require("./shareTikTok");


const videoTikTok = async (page, { fileLink, fileComment, minDelayComment, maxDelayComment, minDelayShare, maxDelayShare } = {
    fileLink: '',
    fileComment: '',
    minDelayComment: 4000,
    maxDelayComment: 5000, minDelayShare: 3000, maxDelayShare: 5000
}) => {
    console.log("start videoTikTok");
    await page.page.setDefaultNavigationTimeout(90000);
    await page.page.setViewport({ width: 1366, height: 768 });
    await delayRandomMs(1000, 4000);
    const links = await readTextParseToArray(fileLink);
    for (let i = 0; i < links.length; i++) {
        try {
            await delayRandomMs(2000, 5000);

            await page.page.bringToFront();
            await page.goto(links[i][0]);
            await page.page.bringToFront();
            await follow(page);
            await clickTim(page);
            await shareTikTok(page, links[i][0]);
          //  const commentFolder = changeNameFileSameFolder(fileLink, links[i][1]);
            const comments = await readTextParseToArray(fileComment);
            console.log(comments);
            for (let j = 0; j < comments.length; j++) {
                try {
                    await page.page.bringToFront();
                    await delayRandomMs(minDelayComment, maxDelayComment);
                    await addComment(page, comments[j][0]);
                } catch (e) {
                    console.log(('Comment ' + e.message) ?? '')
                }
            }
        } catch (error) {
            console.log(error.message ?? '')
        }

    }
    console.log("end videoTikTok");

}

module.exports = videoTikTok