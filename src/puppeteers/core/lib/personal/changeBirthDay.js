//----------- thay doi birthday
const URL_CHANGE_BIRTHDAY = "https://myaccount.google.com/birthday";
const INPUT_DAY =
  ".M0zhbf > .ohXgge:nth-child(1) > .HPjlr > .Ufn6O > .VfPpkd-fmcmS-yrriRe";
const CLICK_INPUT_MONTH =
  ".ohXgge > .JYZIZc > .O1htCb-H9tDt > .VfPpkd-O1htCb > .VfPpkd-TkwUic";
const SELECT_INPUT_MONTH = (month) =>
  ".O1htCb-H9tDt > .VfPpkd-O1htCb > .VfPpkd-xl07Ob-XxIAqe > .VfPpkd-StrnGf-rymPhb > .VfPpkd-StrnGf-rymPhb-ibnC6b:nth-child(" +
  (month + 1) +
  ")";
const INPUT_YEAR =
  ".M0zhbf > .ohXgge:nth-child(3) > .HPjlr > .Ufn6O > .VfPpkd-fmcmS-yrriRe";
const CLICK_ACCEPT_CHANGE_BIRHDAY =
  ".GFJYae > .N1UXxf > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb";
const CLICK_VERIFY_CHANGE_BIRHDAY =
  ".VfPpkd-wzTsW > .VfPpkd-P5QLlc > .VfPpkd-T0kwCb > .VfPpkd-ksKsZd-mWPk3d > .VfPpkd-vQzf8d";

const changeBirthDay = async (page, day, month, year) => {
  try {
    console.log("------changeBirthDay", day, month, year);
    await page.goto(URL_CHANGE_BIRTHDAY);
    await page.delay(3);
    await page.click(INPUT_DAY);
    await page.delay(2);
    await page.input(day);
    await page.delay(1);
    await page.click(CLICK_INPUT_MONTH);
    await page.delay(1);
    await page.click(SELECT_INPUT_MONTH(month));
    await page.delay(2);
    await page.click(INPUT_YEAR);
    await page.delay(1);
    await page.input(year);
    await page.delay(1);
    await page.click(CLICK_ACCEPT_CHANGE_BIRHDAY);
    await page.delay(1);
    await page.click(CLICK_VERIFY_CHANGE_BIRHDAY);
    await page.delay(1);
    await page.delay(8);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeBirthDay;
