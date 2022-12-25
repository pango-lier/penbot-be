const URL_GOOGLE_HOME_ADDRESS_ADS =
  "https://gds.google.com/web/homeaddress?cardIndex=0";
const CLICK_GOOGLE_HOME_ADDRESS_ADS = "#i4";
const CLICK_GOOGLE_HOME_ADDRESS_ADS_SAVE =
  ".plT6yd > .wb6Qsd > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d";
class GoogleAds {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async createHomeAddress(address) {
    try {
      console.log("------createAlert", address);
      await this.page.goto(URL_GOOGLE_HOME_ADDRESS_ADS);
      await this.page.delay(1);
      await this.page.click(CLICK_GOOGLE_HOME_ADDRESS_ADS);
      await this.page.delay(1);
      await this.page.input(address);
      await this.page.delay(3);
      await this.page.enter("ArrowDown");
      await this.page.delay(1);
      await this.page.enter();
      await this.page.delay(2);
      await this.page.click(CLICK_GOOGLE_HOME_ADDRESS_ADS_SAVE);
      await this.page.delay(5);
    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

module.exports = GoogleAds;
