//----------- THAY DOI ANH
//tu trang https://myaccount.google.com/
//click to URL_ACCOUNT_PERSONAL_INFO
const URL_ACCOUNT_PERSONAL_INFO = "https://myaccount.google.com/personal-info";

const CLICK_OPEN_CHANGE_IMAGE = ".R2b1Pb > .ugt2L > .DvHiEc > .N5YmOc > .kKLa4";
const CLICK_BUTTON_CHANGE_IMAGE =
  "#yDmH0d > c-wiz > main > div > div.ziuUIc > div:nth-child(1) > div > button > div.VfPpkd-RLmnJb";
const CLICK_BUTTON_COMPUTER_IMAGE = "#nTuXNc > span.VfPpkd-YVzG2b";
const CLICK_SELECT_COMPUTER_IMAGE =
  "#yDmH0d > c-wiz > main > div > div.hKQkKb.quj2mb > c-wiz > div > div > div.nSdDbb > div:nth-child(1) > button > div.VfPpkd-RLmnJb";

const CLICK_SAVE_AVATAR =
  "c-wiz.iV7aAc > div.ymZEKe > div:nth-child(3) > div > button";

const changeAvatar = async (page, pathAvatar) => {
  try {
    console.log("------changeAvatar", pathAvatar);
    await page.goto(URL_ACCOUNT_PERSONAL_INFO);
    await page.delay(3);
    await page.click(CLICK_OPEN_CHANGE_IMAGE);
    await page.page.waitForSelector('iframe');
    await page.delay(2); ``
    const elementFrame = await page.page.$("iframe[allow='camera https://myaccount.google.com; display-capture https://myaccount.google.com']");
    const frame = await elementFrame.contentFrame();
    await page.delay(3);
    await frame.waitForSelector(CLICK_BUTTON_CHANGE_IMAGE);
    await frame.click(CLICK_BUTTON_CHANGE_IMAGE);
    await page.delay(3);
    await frame.waitForSelector(CLICK_BUTTON_COMPUTER_IMAGE);
    await frame.click(CLICK_BUTTON_COMPUTER_IMAGE);
    await page.delay(3);
    await page.uploadImageFrame(frame, [pathAvatar], CLICK_SELECT_COMPUTER_IMAGE);
    await page.delay(5);
    await frame.waitForSelector(CLICK_SAVE_AVATAR);
    await frame.click(CLICK_SAVE_AVATAR);
    await page.delay(40);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeAvatar;
