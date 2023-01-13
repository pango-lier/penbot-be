const URL_GOOGLE_PHOTO = "https://photos.google.com/u/0/";
const CLICK_GOOGLE_PHOTO_SELECT = '.J3TAe > .rxangc > div:nth-child(1)'; // ".J3TAe > .rxangc > .U26fgb > .I3EnF > .NlWrkb";
const CLICK_GOOGLE_PHOTO_SELECT2 = '.J3TAe > .rxangc > div:nth-child(2)'; // ".J3TAe > .rxangc > .U26fgb > .I3EnF > .NlWrkb";


const CLICK_GOOGLE_PHOTO_COMPUTER =
  ".XvhY1d > .JAPqpe > span:nth-child(2) > .uyYuVb";
const CLICK_IGNORE_GOOGLE_PHOTO = "#yDmH0d > div.llhEMd > div > div.g3VIld > span > div > button";
const CLICK_SELECT_ROOT_PHOTO = "#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.V639qd.ThjExf.Up8vH.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > button > div.VfPpkd-Jh9lGc";
//
class GooglePhoto {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async importFile(paths) {
    try {
      console.log("------GooglePhoto", paths);
      await this.page.goto(URL_GOOGLE_PHOTO);
      await this.page.delay(5);
      if ((await this.page.checkSelector(CLICK_IGNORE_GOOGLE_PHOTO)) === true) {
        await this.page.click(CLICK_IGNORE_GOOGLE_PHOTO);
        await this.page.delay(3);
      }
      try {
        await this.page.click(CLICK_GOOGLE_PHOTO_SELECT2);
      } catch (e) {
        await this.page.click(CLICK_GOOGLE_PHOTO_SELECT);
      }

      await this.page.delay(5);
      await this.page.uploadImage(paths, CLICK_GOOGLE_PHOTO_COMPUTER);
      await this.page.delay(5);
      await this.page.click(CLICK_SELECT_ROOT_PHOTO);
      await this.page.delay(35);
    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

module.exports = GooglePhoto;
