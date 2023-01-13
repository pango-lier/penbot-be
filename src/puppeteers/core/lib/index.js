const GoogleAlerts = require("./googleAlert");
const GoogleNews = require("./googleNews");
const GooglePhoto = require("./googlePhoto");
const Personal = require("./personal");
const PuppeteerActionFunc = require("./pup");
const fs = require("fs");
const { getAllPaths, randomParseTextToArray } = require("./helper");
const GoogleAds = require("./googleAds");
const Youtube = require("./youtube");
const googleLogin = require("./googleLogin");
const setting = JSON.parse(fs.readFileSync("./config/env.json"));

const runChangAccountGoogle = async (page, sttAcc = null, folder = '') => {
  const pup = new PuppeteerActionFunc(page, 0.5, 0.5);
  await googleLogin(pup, __dirname + "/helper/accounts.txt", sttAcc,folder);

  const personal = new Personal();
  await personal.run(pup, setting, sttAcc, folder);

  const news = new GoogleNews(pup);
  await news.enterMyLocation(randomParseTextToArray("./config/gg-news.txt"));
  const alert = new GoogleAlerts(pup);
  await alert.createAlert(randomParseTextToArray("./config/gg-alert.txt"));
  const photo = new GooglePhoto(pup);
  await photo.importFile(getAllPaths(setting.path_google_photo));

  const ads = new GoogleAds(pup);
  await ads.createHomeAddress(randomParseTextToArray("./config/location.txt"));

  const youtube = new Youtube(pup);
  await youtube.run();
};

module.exports = runChangAccountGoogle;
