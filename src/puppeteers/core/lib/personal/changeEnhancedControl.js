//----------bat che do duyet web an toan
const URL_ACCOUNT_ENHANCED_SAVE_BROWSING =
  "https://myaccount.google.com/account-enhanced-safe-browsing";
const CLICK_ENABLE_ENHANCED =
  ".iAwpk > .kvjuQc > .xPQZNe > .VfPpkd-scr2fc > .VfPpkd-DVBDLb-LhBDec-sM5MNb";
const CLICK_VERIFY_ENABLE_ENHANCED = ".VfPpkd-T0kwCb button:nth-child(2)";

const changeEnhancedControl = async (page, enable = true) => {
  try {
    console.log("------changeEnhancedControl");
    await page.goto(URL_ACCOUNT_ENHANCED_SAVE_BROWSING);
    await page.delay(3);
    const check = await page.getAttributeSelector(
      ".iAwpk > .kvjuQc > .xPQZNe > .VfPpkd-scr2fc",
      "aria-checked"
    );
    console.log("--changeEnhancedControl", check);
    if (enable !== check) {
      await page.click(CLICK_ENABLE_ENHANCED);
      await page.delay(1);
      await page.click(CLICK_VERIFY_ENABLE_ENHANCED);
      await page.delay(7);
    }
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeEnhancedControl;
