//-------chang name
const URL_CHANGE_NAME = "https://myaccount.google.com/profile/name";
// click de di toi edit
const CLICK_TO_CHANGE_FULL_NAME =
  ".zHA9i > .fOc3le > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc > .NSy2Hd > path:nth-child(2)";
// trang edit
const URL_CHANGE_FULL_NAME_EDIT =
  "https://myaccount.google.com/profile/name/edit";
const INPUT_FIRST_NAME = "#i7";
const INPUT_LAST_NAME = "#i10";
// disable
const BUTTON_ACCEPT_CHANGE_NAME =
  ".T3o42d > .N1UXxf > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button";

const changeFullName = async (page, firstName, lastName) => {
  try {
    console.log("------changeFullName", firstName, lastName);
    await page.goto(URL_CHANGE_FULL_NAME_EDIT);
    // await page.click(CLICK_TO_CHANGE_FULL_NAME);
    await page.click(INPUT_FIRST_NAME);
    await page.delay(1);
    await page.input(firstName);
    await page.delay(1);
    await page.click(INPUT_LAST_NAME);
    await page.delay(1);
    await page.input(lastName);
    await page.delay(1);
    await page.click(BUTTON_ACCEPT_CHANGE_NAME);
    await page.delay(8);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeFullName;
