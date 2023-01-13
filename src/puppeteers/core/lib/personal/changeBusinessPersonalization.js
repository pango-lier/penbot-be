//---------bat ca nhan hoa doanh nghiep
const URL_ENABLE_BUSINESS_PERSONALIZATION =
  "https://myaccount.google.com/businesspersonalization";
const CLICK_ENABLE_BUSINESS_PERSONALIZATION =
  ".iAwpk > .kvjuQc > .xPQZNe > .VfPpkd-scr2fc > .VfPpkd-DVBDLb-LhBDec-sM5MNb";

const changeBusinessPersonalization = async (page, enable = true) => {
  try {
    console.log("------changeDeviceContact");
    await page.goto(URL_ENABLE_BUSINESS_PERSONALIZATION);
    await page.delay(3); //aria-checked="false"
    const check = await page.getAttributeSelector(
      ".iAwpk > .kvjuQc > .xPQZNe > .VfPpkd-scr2fc",
      "aria-checked"
    );
    console.log("--getAttributeSelector", check);
    if (enable !== check) {
      await page.click(CLICK_ENABLE_BUSINESS_PERSONALIZATION);
      await page.delay(3);
    }
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeBusinessPersonalization;
