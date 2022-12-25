const URL_GOOGLE_ALERT = "https://www.google.com/alerts#";
const CLICK_GOOGLE_ALERT = "#main-controls > #create-alert-div > #search_box > #query_div > input";
class GoogleAlerts {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async createAlert(alerts) {
    try {
      console.log("------createAlert", alerts);
      await this.page.goto(URL_GOOGLE_ALERT);
      await this.page.delay(2);
      for (let i = 0; i < alerts.length; i++) {
        await this.page.click(CLICK_GOOGLE_ALERT);
        await this.page.input(alerts[i]);
        await this.page.delay(1);
        await this.page.click("#create_alert");
        await this.page.delay(4);
      }
    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

module.exports = GoogleAlerts;