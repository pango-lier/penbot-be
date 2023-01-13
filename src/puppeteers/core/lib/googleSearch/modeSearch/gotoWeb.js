const { random } = require("../../until")

const gotoRandomWeb = async (page, links, scoreRollDow = 86, level = 4) => {
    try {
        if (links.length <= 0) return false;
        const link = links[random(0, links.length - 1)];
        await page.goto(link);
        console.log("gotoRandomWeb " + link);
        await page.delayRandomMs(3400, 7000);
        switch (level) {
            case 2:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 422, delayMax: 1500 }, { stepMin: 40, stepMax: 120 }, { loopMin: 40, loopMax: 75 });
                break;
            case 3:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 200, delayMax: 2000 }, { stepMin: 60, stepMax: 200 }, { loopMin: 35, loopMax: 60 });
                break;
            default:
            case 4:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 2500 }, { stepMin: 40, stepMax: 350 }, { loopMin: 25, loopMax: 45 });
                break;
            case 5:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 3500 }, { stepMin: 70, stepMax: 450 }, { loopMin: 20, loopMax: 40 });
                break;
            case 6:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 400, delayMax: 4000 }, { stepMin: 100, stepMax: 550 }, { loopMin: 15, loopMax: 30 });
                break;
            case 7:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 500, delayMax: 3500 }, { stepMin: 200, stepMax: 600 }, { loopMin: 15, loopMax: 25 });
                break;
            case 8:
                await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 1000, delayMax: 5500 }, { stepMin: 70, stepMax: 750 }, { loopMin: 10, loopMax: 15 });
                break;
        }

        await page.delayRandomMs(1000, 7000);
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = gotoRandomWeb;