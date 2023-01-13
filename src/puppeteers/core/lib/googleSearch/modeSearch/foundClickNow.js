const { random } = require("../../until");
const findDomain = require("../helper/findDomain");
const processTargetDomain = require("./processTargetDomain");

const foundClickNow = async (page, linkActives, domain, config) => {
    const domainExist = await findDomain(linkActives, domain);
    if (domainExist) {
        await processTargetDomain(page, domainExist, random(2, 8), 90, config);
        return true;
    }
    return false;
}

module.exports = foundClickNow;