const getSearchLinks = require("../helper/getSearchLinks");
const getLinkInnerWindow = require("./getLinkInnerWindow");

const getInfoLink = async (page, current, selector = 'a[href*="http"]') => {
    const size = await page.getSizeWindow();
    const body = await page.getSizeWindowBody();
    const links = await getSearchLinks(selector, page);
    const linkActives = await getLinkInnerWindow(current, links, size, false);
    return { size, body, links, linkActives }
}

module.exports = getInfoLink;
