const URL_GOOGLE_NEWS = "https://news.google.com";
const URL_GOOGLE_NEWS_MY_LOCATION = "https://news.google.com/my/locations";
const CLICK_GOOGLE_NEWS_MY_LOCATION =
  ".ukytlb > .BGKIec > .L6J0Pc > .d1dlne > .Ax4B8";
class GoogleNews {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async enterMyLocation(zips) {
    try {
      await this.page.goto(URL_GOOGLE_NEWS_MY_LOCATION);
      for (let i = 0; i < zips.length; i++) {
        await this.page.delay(1);
        await this.page.click(CLICK_GOOGLE_NEWS_MY_LOCATION);
        await this.page.delay(1);
        await this.page.input(zips[i]);
        await this.page.delay(3);
        await this.page.enter("ArrowDown");
        await this.page.delay(1);
        await this.page.enter();
        await this.page.delay(4);
      }
    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

module.exports = GoogleNews;
