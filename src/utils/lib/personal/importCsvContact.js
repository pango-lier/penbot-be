//---------- nhap danh ba

const URL_CONTACT = "https://contacts.google.com/";
const CLICK_CONTACT_POPUP =
  ".RIlYPc > .qJFFPb > .JABf8e > .VfPpkd-LgbsSe:nth-child(2)";
const CLICK_CONTACT_TRIGGER = ".g3VIld > .PbnGhe > .i1RACe > label > .VsU9rf";
const CLICK_CONTACT_VERIFY =
  ".g3VIld > .XfpsVe > div > .VfPpkd-LgbsSe:nth-child(2)"; // > .VfPpkd-vQzf8d

const importCsvContact = async (page, path) => {
  try {
    console.log("------importCsvContact", path);
    await page.goto(URL_CONTACT);
    await page.delay(2);
    await page.click(CLICK_CONTACT_POPUP);
    await page.delay(2);

    await page.uploadImage([path], CLICK_CONTACT_TRIGGER);
    await page.delay(2);
    await page.click(CLICK_CONTACT_VERIFY);

    await page.delay(50);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = importCsvContact;
