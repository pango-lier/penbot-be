// --DELETE security
const URL_SECURITY = "https://myaccount.google.com/security";
const URL_DELETE_SECURITY = "https://myaccount.google.com/device-activity";

const CLICK_GOTO_DELETE_SECURITY = (num) =>
  ".K6ZZTd:nth-child(" +
  num +
  ") > .VfPpkd-ksKsZd-XxIAqe > .zwGcVb > .iAwpk > .kvjuQc > .Ivdcjd > span > .NMm5M";
const CLICK_SECURITY_LOGOUT =
  ".VfPpkd-rOvkhd-XPtOyb-hhpA7 > #cEoysc > .VfPpkd-rOvkhd-AnTmuf > #ucc-0 > .VfPpkd-rOvkhd-jPmIDe-dgl2Hf";
const CLICK_SECURITY_VERIFY =
  ".NGSkPe > .EenoKf > .KsHAYd > .VfPpkd-LgbsSe:nth-child(2) > .VfPpkd-vQzf8d";
const CLICK_SECURITY_OK =
  ".NGSkPe > .EenoKf > .KsHAYd > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d";

const CLICK_BACK_DELETE_SECURITY =
  ".zQTmif:nth-child(20) > .T4LgNb:nth-child(1) > div:nth-child(2) > .EWuRAb:nth-child(1) > .ikIPKb:nth-child(1) > .edoSyc:nth-child(1) > .U26fgb:nth-child(1) > .xjKiLb:nth-child(2) > .Ce1Y1c:nth-child(1) > .DPvwYc:nth-child(1)";

const changeDeleteSecurity = async (page) => {
  try {
    console.log("------changeDeleteSecurity");
    await page.goto(URL_DELETE_SECURITY);
    await page.delay(3);
    let i = 1;
    while (1) {
      if (!(await page.checkSelector(CLICK_GOTO_DELETE_SECURITY(i))) === false)
        break;
      await page.click(CLICK_GOTO_DELETE_SECURITY(i));
      try {
        await page.delay(2);
        if (await page.checkSelector(CLICK_SECURITY_LOGOUT)) {
          await page.click(CLICK_SECURITY_LOGOUT);
          await page.delay(1);
          await page.click(CLICK_SECURITY_VERIFY);
          await page.delay(1);
          await page.click(CLICK_SECURITY_OK);
          await page.delay(8);
        }
      } catch (e) {
        console.log(i + e.message + " . " + page.location);
      }
      i = i + 1;
    }
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeDeleteSecurity;
