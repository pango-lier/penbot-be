const URL = "https://myaccount.google.com/language";
const BUTTON_ADD_OTHER_LANGUGE = '.K12zk > .N1UXxf > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d';
const SELECT_VIETNAM = '.OY8tq > .k1a2c > .PyRuub > .VfPpkd-rymPhb > .MCs1Pd:nth-child(96)';
const ACEPT_SELECT_VIETNAM = 'button:nth-child(2)';
const BUTTON_EDIT = ".kvjuQc > .N1UXxf > .VfPpkd-Bz112c-LgbsSe > .VfPpkd-kBDsod > .NMm5M"
const changeLanguage = async (page) => {
    try {
        await page.goto(URL);
        await page.delay(3);
        if (await page.checkSelector(BUTTON_EDIT)) {
            await page.click(BUTTON_EDIT);
        }
        else await page.click(BUTTON_ADD_OTHER_LANGUGE);
        await page.delay(5);
        await page.click('label > input');
        await page.delay(1);
        await page.input("Tiếng Việt");
        await page.delay(5);
        await page.click(SELECT_VIETNAM);
        await page.delay(2);
        await page.click(ACEPT_SELECT_VIETNAM);
        await page.delay(8);
    } catch (e) {
        console.log(e?.message || 'ee');
    }
}
module.exports = changeLanguage;