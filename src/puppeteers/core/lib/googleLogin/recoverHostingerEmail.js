
const hosingerLogin = require("../hostinger");

const URL_RECOVER = "https://myaccount.google.com/recovery/email?continue=https://myaccount.google.com/email&pli=1";
const recoverHostingerEmail = async (page, info) => {
    try {
        await page.goto(URL_RECOVER);
        await page.delay(5);
        if (await page.checkSelector("#password")) {
            await page.delay(1);
            await page.click("#password");
            await page.delay(1);
            await page.input(info.password);
            await page.delay(2);
            await page.enter();
            await page.delay(5);
        }
        await page.click('input[type="email"]');
        await page.delay(1);
        await page.input(info.recoveryVerifyEmail);
        await page.delay(2);
        await page.enter();
        await page.delay(5);
        if (await page.checkSelector("#password")) {
            await page.delay(1);
            await page.click("#password");
            await page.delay(1);
            await page.input(info.password);
            await page.delay(2);
            await page.enter();
            await page.delay(5);
        }


        const verifyCode = await hosingerLogin(page, info.recoveryVerifyEmail, info.recoveryVerifyPassword);
        await page.page.bringToFront();
        await page.delay(2);
        await page.click('input[inputmode="numeric"]');
        await page.input(verifyCode);
        await page.delay(2);
        await page.enter();
        await page.delay(20);
        if (await page.checkSelector('input[inputmode="numeric"]')) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e.message);
    }
    return false;
}
module.exports = recoverHostingerEmail;
// for (let index = 0; index < 50; index++) {
//     const element = `c${index}`;
//     if (await page.checkSelector(element)) {
//         const check = await page.getAttributeSelector(
//             element,
//             "inputmode"
//         );
//         if (check == "numeric") {
//             await page.click(element);
//             await page.input(verifyCode);
//             await page.delay(2);
//             await page.enter();
//             await page.delay(20);
//             if (await page.checkSelector(element)) {
//                 return false;
//             }
//             break;
//         }
//     }
// }
