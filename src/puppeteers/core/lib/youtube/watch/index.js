const { readTextParseToArray } = require("../../helper");
const { delayRandomMs } = require("../../until");


const watchYoutube = async (page, { fileLink, timeOut } = {
    fileLink: '',
    timeOut: 1200
}) => {
    console.log("start watchYoutube");
    await page.page.setDefaultNavigationTimeout(90000);
    await page.page.setViewport({ width: 1366, height: 768 });
    await delayRandomMs(1000, 4000);
    const links = await readTextParseToArray(fileLink);
    for (let i = 0; i < links.length; i++) {
        console.log(links[i][0]);
        try {
            let timeStop = (new Date()).getTime() + timeOut * 1000;
            await page.page.bringToFront();
            await page.goto(links[i][0]);
            do {
                try {
                    console.log()
                    await page.checkSelector("none-target-error")
                    await delayRandomMs(1, 5);
                    await page.checkSelector("trigger-save");
                    await delayRandomMs(1, 5);
                    await page.checkSelector('save-target');
                } catch (error) {
                }
            } while ((new Date()).getTime() < timeStop);
        } catch (error) {
            console.log(error.message);
        }
    }
    console.log("end watchYoutube");
}


module.exports = watchYoutube