

const PuppeteerActionFunc = require("../pup");
const hosingerLogin = async (page, email, password) => {
    console.log("start hosingerLogin");
    try {
        const browser = await page.page.browser();
        const _page = await browser.newPage();
        page = new PuppeteerActionFunc(_page, 0.1, 0.05);
        await page.delay(1);
        await page.page.bringToFront();
        await page.goto("https://mail.hostinger.com/");
        await page.delay(10);

        if (await page.checkSelector("#rcmloginuser")) {
            await page.click("#rcmloginuser");
            await page.input(email);
            await page.delay(2);
            await page.click("#rcmloginpwd");
            await page.input(password);
            await page.delay(2);
            await page.enter();
        }
        await page.delay(5);
        await page.goto("https://mail.hostinger.com/?_task=mail&_mbox=INBOX");
        await page.delay(20);
        for (let i = 0; i < 4; i++) {
            const data = await page.getContentSelector(`tr:nth-child(${1}) td span a span`);
            console.log(data);
            if (data.search("Email verification code:") >= 0 || data.search("Mã xác minh cho email khôi phục:") >= 0) {
                console.log(data.match(/\d+/)[0]);
                await page.page.close();
                return data.match(/\d+/)[0];
            }

        }

    }

    catch (e) {
        console.log(e.message);
    }
    console.log("end hosingerLogin");
    await page.page.close();
    return undefined;
}

module.exports = hosingerLogin