const URL_YOUTUBE_ACCOUNT = "https://www.youtube.com/account";

const CLICK_GOTO_MANAGER_CHANEL =
  "#content > #options > .style-scope > .link:nth-child(3) > .yt-simple-endpoint";
const CLICK_GOTO_CREATE_CHANEL = "#button";
const CLICK_RADIO_CHECK =
  ".primary-content > .signup-form > #createaccount > .brandaccount-consent-footer-container > .consent-checkmark";
const createChannel = async (page, name) => {
  try {
    console.log("------createChannel", name);
    await page.goto(URL_YOUTUBE_ACCOUNT);
    await page.delay(2);
    await page.click(CLICK_GOTO_MANAGER_CHANEL);
    await page.delay(2);
    await page.click(CLICK_GOTO_CREATE_CHANEL);
    await page.delay(2);
    await page.click("#PlusPageName");
    await page.delay(1);
    await page.input(name);
    await page.delay(1);
    await page.click(CLICK_RADIO_CHECK);
    await page.delay(1);
    await page.click("#submitbutton");
    await page.delay(20);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = createChannel;