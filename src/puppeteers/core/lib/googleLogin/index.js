
//accounts.google.com/

const { writeXLoginFailed } = require("../helper");
const hosingerLogin = require("../hostinger");
const readEmailLogin = require("./readEmailLogin");
const recoverHostingerEmail = require("./recoverHostingerEmail");
const removeFirstLine = require("./removeFirstLine");

const URL_GOOGLE_ACCOUNT_ABOUT = "https://www.google.com/account/about/";
const URL_GOOGLE_LOGIN_REJECT = "https://accounts.google.com/v3/signin/rejected";
const URL_ACCOUNT = "https://accounts.google.com/";
const URL_ACCOUNT_INFO = "https://myaccount.google.com";
const URL_SELECT_ACCOUNT = "https://accounts.google.com/ServiceLogin/signinchooser";
const URL_CHALLENGE_IPE = "https://accounts.google.com/signin/challenge/ipe";
const URL_SELECTION_CHALLENGE_EMAIL = "https://accounts.google.com/signin/selectchallenge";
const URL_SELECTION_RECOVERY_EMAIL = "https://accounts.google.com/signin/v2/challenge/selection";

const URL_RECOVERY_EMAIL = "https://myaccount.google.com/recovery/email?continue=https://myaccount.google.com/email&pli=1";

const BTN1_CLICK_SIGNIN = '.h-c-header__bar > .h-c-header__cta > .h-c-header__cta-list > .h-c-header__cta-li--primary > .h-c-header__cta-li-link';
const BTN2_CLICK_SIGNIN = "#overview > .gacct-epilog > .gacct-epilog-col > .gacct-epilog-ctas > .h-c-button--primary";

const SELECT_OTHER_ACCOUNT = "#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > div > ul > li:nth-child(2)";
const SELECT_RECOVERY_EMAIL = "#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > ul > li:nth-child(3) > div";
const googleLogin = async (page, file, sttAcc, folder, changeEmailRecover = true) => {
    try {
        const { info } = readEmailLogin(file, sttAcc);
        await page.goto(URL_ACCOUNT);
        await page.delay(5);
        if (!await page.isUrlCurrent(URL_ACCOUNT_INFO)) {
            await redirectToLogin(page);

            console.log(info);
            //forcus nhap email
            await page.click("#identifierId");
            await page.delay(4);
            await page.input(info.email);
            await page.delay(4);
            // click nut xac nhan email
            await page.enter();
            await page.delay(6);
            console.log("Password " + await page.location());
            if (await page.isUrlCurrent(URL_GOOGLE_LOGIN_REJECT)) {
                // if reject 
                console.log("Google login is Reject .")
                await page.click("#next");
            }
            // //forcus o password
            await page.click("#password");
            await page.input(info.password);
            await page.delay(4);
            await page.enter();
            await page.delay(5);
            // if (await page.isUrlCurrent(URL_SELECTION_CHALLENGE_EMAIL)) {
            //     console.log('select challenge');
            //     await page.click('img[src="//ssl.gstatic.com/accounts/marc/rescueemail.png"]');//:nth-child(2);
            //     await page.delay(4);
            //     if (await page.isUrlCurrent(URL_CHALLENGE_IPE)) {
            //         if (info.recoveryPassword != '') {
            //             console.log('login hostinger');
            //             const verifyCode = await hosingerLogin(page, info.recoveryEmail, info.recoveryPassword);
            //             await page.page.bringToFront();
            //             await page.delay(2);
            //             await page.click("#pin");
            //             await page.input(verifyCode);
            //             await page.delay(1);
            //             await page.enter();
            //             await page.delay(1);
            //         }
            //     }
            // }
            if (await page.isUrlCurrent(URL_SELECTION_RECOVERY_EMAIL)) {
                console.log("Login " + info.email + " is recovery .", await page.location());
                // if reject
                await page.click(SELECT_RECOVERY_EMAIL);
                await page.delay(5);
                await page.click("#knowledge-preregistered-email-response");
                await page.delay(6);
                await page.input(info.recoveryEmail);
                await page.delay(6);
                await page.enter();
            }

            await page.delay(15);
            await page.goto(URL_ACCOUNT);
            await page.delay(20);
        }
        console.log("Login " + info.email + " is successful .", await page.location());
        if (await page.isUrlCurrent(URL_ACCOUNT_INFO)) {
            if (changeEmailRecover && await recoverHostingerEmail(page, info)) {
                await changeRecoverMailFile(file, sttAcc, info.recoveryVerifyEmail, folder);
                await page.delay(2);
            }

            return true;
        }
    } catch (e) {
        console.log(e.message + " . " + await page.location());
    }
    await writeXLoginFailed(file, sttAcc, folder);
    return false;
}

const redirectToLogin = async (page) => {
    if (await page.isUrlCurrent(URL_GOOGLE_ACCOUNT_ABOUT)) {
        if (await page.checkSelector(BTN1_CLICK_SIGNIN)) {
            console.log("Click go to login");
            await page.click(BTN1_CLICK_SIGNIN);
        }
        else if (await page.checkSelector(BTN2_CLICK_SIGNIN)) {
            await page.click(BTN2_CLICK_SIGNIN);
        }
        await page.delay(3);
    }
    if (await page.isUrlCurrent(URL_SELECT_ACCOUNT)) {
        if (await page.checkSelector(SELECT_OTHER_ACCOUNT)) {
            console.log("Other account");
            await page.click(SELECT_OTHER_ACCOUNT);
        }
        await page.delay(3);
    }
}



module.exports = googleLogin;


