//--------privacy

const URL_DATA_PRIVACY = "https://myaccount.google.com/data-and-privacy";
const URL_ACTIVE_CONTROL = "https://myactivity.google.com/activitycontrols";
const CLICK_HISTORY_LOCATION_BUTTON =
  ".Mv4Fq > .RezJOb > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button > .VfPpkd-vQzf8d";

const CLICK_ENABLE_HISTORY_LOCATION_BUTTON =
  ".JcnXp > div > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button > .VfPpkd-RLmnJb";

const changeActiveControl = async (page, enable = true) => {
  try {
    console.log("------changeActiveControl");
    await page.goto(URL_ACTIVE_CONTROL);
    await page.delay(3);
    const check = await page.getAttributeSelector(
      ".Mv4Fq > .RezJOb > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button",
      "data-is-on"
    );
    console.log("--changeActiveControl", check);
    await page.click(CLICK_HISTORY_LOCATION_BUTTON);
    if (check !== enable) {
      for (let i = 0; i < 8; i++) {
        await page.delay(1);
        await page.page.keyboard.press("ArrowDown");
      }
      await page.delay(2);
      await page.click(CLICK_ENABLE_HISTORY_LOCATION_BUTTON);
      await page.delay(8);
    }
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeActiveControl;
