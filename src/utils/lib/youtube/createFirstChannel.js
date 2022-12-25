const URL_YOUTUBE_ACCOUNT = "https://www.youtube.com/account/";
const CLICK_POPUP_CREATE = 'a[href="/create_channel"]';
const createFirstChannel = async (page) => {
    try {
        console.log("------createFirstChannel");
        await page.goto(URL_YOUTUBE_ACCOUNT);
        await page.delay(4);
        if ((await page.checkSelector(CLICK_POPUP_CREATE)) === true) {
            console.log("------click pop up");
            await page.click(CLICK_POPUP_CREATE);

            await page.delay(15);
            await page.click("#create-channel-button");
            await page.delay(30);
            console.log("createFirstChannel is successful .");
        } else {
            console.log("Button Create Channel not found .");
        }
        await page.delay(4);
    } catch (e) {
        console.log(e.message + " . " + page.location);
    }
};

module.exports = createFirstChannel;