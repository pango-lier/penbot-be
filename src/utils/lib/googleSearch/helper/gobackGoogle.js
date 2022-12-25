const { random } = require("../../until");

const goBackGoogle = async (page) => {
    const location = await page.location();
    if (location.search("https://www.google.com") < 0 && location.search("/search?q=") < 0) {
        try {
            await page.page.bringToFront();
            await page.page.goBack({ load: true, timeout: random(2700, 3800) });
        } catch (e) {
            console.log(e);
        }
    }
}
// /https://www.google.com.vn/search?q=
module.exports = goBackGoogle;