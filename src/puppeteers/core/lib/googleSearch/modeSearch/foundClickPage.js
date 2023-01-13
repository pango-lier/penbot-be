
const { random } = require("../../until");
const findLinkPageByName = require("../helper/findLinkPageByName");

const foundClickPage = async (page, linksPages, pageNumber, config) => {
    pageNumber = selectPage(pageNumber, config.pageMode, config.maxPage);
    const domainExist = await findLinkPageByName(linksPages, pageNumber);
    if (domainExist) {
        await page.delayRandomMs(800, 3500);
        console.log("foundClickPage : Page" + pageNumber);
        await page.clickHref('a[aria-label="Page ' + pageNumber + '"]');
        await page.delayRandomMs(2000, 5000);
        return pageNumber;
    }
    await page.delayRandomMs(200, 500);
    return pageNumber;
}

const selectPage = (page, mode = "random-optimize", maxPage) => {
    switch (mode) {
        case "ascending":
            if (page < maxPage) page++;
            else page = 1
            break;

        default:
        case "random-optimize":
            if (page === 1) {
                const score = random(0, 100);
                if (score < 90) page = 2;
                else if (score < 94) page = 3;
                else if (score < 98) page = 4;
                else page = 5;
            } else if (page === 2) {
                const score = random(0, 100);
                if (score < 5) page = 1;
                else if (score < 94) page = 3;
                else if (score < 98) page = 4;
                else page = 5;
            }
            else if (page === 3) {
                const score = random(0, 100);
                if (score < 6) page = 1;
                else if (score < 8) page = 2;
                else if (score < 96) page = 4;
                else page = 5;
            }
            else if (page === 4) {
                const score = random(0, 100);
                if (score < 10) page = 1;
                else if (score < 13) page = 2;
                else if (score < 15) page = 3;
                else if (score < 95) page = 5;
                else if (score < 97) page = 6;
                else page = 7;
            }
            else if (page === 5) {
                const score = random(0, 100);
                if (score < 50) page = 1;
                else if (score < 80) page = 2;
                else if (score < 92) page = 3;
                else if (score < 93) page = 4;
                else if (score < 95) page = 6;
                else if (score < 97) page = 7;
                else page = 8;
            }
            else if (page === 6) {
                const score = random(0, 100);
                if (score < 50) page = 1;
                else if (score < 55) page = 2;
                else if (score < 60) page = 3;
                else if (score < 65) page = 4;
                else if (score < 75) page = 5;
                else if (score < 95) page = 7;
                else page = 8;
            }
            else if (page === 7) {
                const score = random(0, 100);
                if (score < 50) page = 2;
                else if (score < 70) page = 3;
                else if (score < 75) page = 4;
                else if (score < 80) page = 5;
                else if (score < 83) page = 6;
                else page = 8;
            }
            else if (page === 8) {
                const score = random(0, 100);
                if (score < 80) page = 3;
                else if (score < 85) page = 4;
                else if (score < 90) page = 5;
                else if (score < 98) page = 6;
                else page = 7;
            }
            break;
    }
    return page;
}

module.exports = foundClickPage;