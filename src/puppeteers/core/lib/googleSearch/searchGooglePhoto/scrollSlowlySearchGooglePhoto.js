const { random } = require("../../until");
const foundClickNow = require("../modeSearch/foundClickNow");
const scrollDownInfo = require("../modeSearch/scrollDownInfo");

const scrollSlowlySearchGooglePhoto = async (page, domain, config) => {
    let foundDomain = false;
    for (let i = 0; i < random(15, 30); i++) {
        try {
            const info = await scrollDownInfo(page, domain, 92, config.levelScroll);
            if (!foundDomain) {
                foundDomain = await foundClickNow(page, info.links, domain, config);
                if (foundDomain) return foundDomain;
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return foundDomain;
}

module.exports = scrollSlowlySearchGooglePhoto