const { changePasswordFile, writeXLoginFailed, findEmailInfo } = require("../helper");


const URL = "https://accounts.google.com/signin/v2/recoveryidentifier";
const URL_PASSWORD = "challenge/pwd";
const URL_OTHER_LINK = "recovery/summary";

const changePassword2 = async (page, filePath, sttAcc, newPwd = "Abc@1234@") => {
    try {
        const info = await findEmailInfo(filePath, sttAcc);
        await page.goto(URL);
        console.log(info);
        if (await page.isUrlCurrent("recoveryidentifier")) {
            console.log("validate email");
            await page.click('#identifierId')
            await page.delay(1);
            await page.input(info[0]);
            await page.delay(1);
            await page.enter();
            await page.delay(5);

        }
        await page.delay(5);
        if (await page.isUrlCurrent(URL_PASSWORD)) {
            console.log("validate password");
            await page.click("#password");
            await page.delay(1);
            await page.input(info[1]);
            await page.delay(1);
            await page.enter();
            await page.delay(10);

        }
        await page.delay(5);
        if (await page.isUrlCurrent(URL_OTHER_LINK)) {
            console.log("validate password");
            await page.click("#another-link");
            await page.delay(10);
        }

        if (!(await page.isUrlCurrent("signinoptions/password"))) {
            console.log("Login failed .");
            return false;
        }
        await page.click("#i6");
        await page.input(newPwd);
        await page.delay(1);
        await page.click("#i10");
        await page.input(newPwd);
        await page.delay(1);
        await page.enter();
        await page.delay(15);
        if (await page.isUrlCurrent(URL)) {
            //  await writeXLoginFailed(filePath, sttAcc);
            console.log("change password is failed .");
            return false;
        }
        console.log("password change successful .");
        await changePasswordFile(filePath, sttAcc, newPwd,folder);
        return true;
    } catch (e) {
        console.log(e.message + " . " + await page.location());
    }
    return false;
}

module.exports = changePassword2;