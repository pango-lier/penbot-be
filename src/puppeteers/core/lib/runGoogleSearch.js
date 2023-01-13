const GoogleSearch = require("./googleSearch");
const { randomParseTextToArray } = require("./helper");
const PuppeteerActionFunc = require("./pup");
const timeout = (prom, time) =>
  Promise.race([prom, new Promise((_r, rej) => setTimeout(rej, time*1000))]);
const runGoogleSearch = async (page) => {
  const pup = new PuppeteerActionFunc(page, 0.5, 0.5);
  const googleSearch = new GoogleSearch(pup);
  // const search = randomParseTextToArray("./keywork/index.txt");
  const domain = "https://nhomkinhdalat.com/";
  await timeout(
    googleSearch.run(["nhom kinh da lat"], domain, [], []),
    5);
};

module.exports = runGoogleSearch;