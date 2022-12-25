//----------luu thong lien he ban da dang nhap
const URL_DEVICE_CONTACT = "https://myactivity.google.com/devicecontacts";
const CLICK_ENABLE_DEVICE_CONTACT =
  ".nc5QUb > div > div > .VfPpkd-scr2fc > .VfPpkd-DVBDLb-LhBDec-sM5MNb";

const changeDeviceContact = async (page, enable = true) => {
  try {
    console.log("------changeDeviceContact");
    await page.goto(URL_DEVICE_CONTACT);
    await page.delay(3); //aria-checked="false"
    const check = await page.getAttributeSelector(
      ".nc5QUb > div > div > .VfPpkd-scr2fc",
      "aria-checked"
    );
    console.log("--getAttributeSelector", check);
    if (check !== enable) {
      await page.click(CLICK_ENABLE_DEVICE_CONTACT);
      await page.delay(7);
    }
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeDeviceContact;
