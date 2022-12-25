
const randomScore = require('./helper/randomScore');
const { delay, random, delayMs } = require('./until')

class PuppeteerActionFunc {
    page;
    delayClickTime;
    delayTypingTime;
    constructor(
        page,
        delayClickTime,
        delayTypingTime
    ) {
        this.page = page;
        this.delayClickTime = delayClickTime || 0.3;
        this.delayTypingTime = delayTypingTime || 0.05;
    }
    /**
     * click element
     */
    async click(target, options = {}) {
        await delay(this.delayClickTime);
        await this.page.waitForSelector(target);
        return this.page.click(target, options);
    }
    /**
     * goto url
     */
    async goto(url) {
        return this.page.goto(url, {
            waitUntil: "networkidle2",
        });
    }
    /**
     */
    async waitForSelector(selector) {
        return this.page.waitForSelector(selector);
    }
    /**
     * await a element Remove
     */
    /**
     * Type some text with speed per character is default 0,05s
     */
    async enter(key = 'Enter') {
        return await this.page.keyboard.press(key);
    }
    async input(value, delay = 1000) {
        // tslint:disable-next-line: prefer-for-of
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');
        await this.page.keyboard.press('Backspace');
        if (value !== null && value !== undefined && value !== 'null') {
            return this.page.keyboard.type(value + '', { delay: this.delayTypingTime * delay });
        }
    }

    async type(value) {
        if (value !== null && value !== undefined && value !== 'null') {
            return await this.page.keyboard.sendCharacter(value);
        }
    }

    /**
     * Upload file target input type file
     */
    // async uploadFile(url, selector, conditionPass): Promise<boolean> {
    //   const formUpload = await this.page.waitForSelector(selector);
    //   const pathFile = await downloadFile(url);
    //   await delay(1);
    //   await formUpload.uploadFile(pathFile);
    //   await delay(1);
    //   const result = formUpload.evaluate((upload) =>
    //     upload.dispatchEvent(new Event("change", { bubbles: true }))
    //   );
    //   // await this.page.waitForSelector(conditionPass, { timeout: 300000 });
    //   try {
    //     const fs = require("fs");
    //     await delay(1);
    //     await fs.unlinkSync(pathFile);
    //   } catch (e) {}
    //   return result;
    // }

    async uploadImage(
        pathFiles,
        fileChooserTriggerXpath,
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            this.click(fileChooserTriggerXpath),
        ]);
        await fileChooser?.accept(pathFiles);
    }

    async uploadImageFix2(
        pathFiles,
        se1, se2
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            this.check2(se1, se2),
        ]);
        await fileChooser?.accept(pathFiles);
    }

    async check2(
        se1,
        se2,
    ) {
        await this.click(se1);
        await this.delay(3);
        if (await this.checkSelector(se2)) {
            await this.click(se2);
        }
    }

    async uploadImageFrame(
        frame,
        pathFiles,
        fileChooserTriggerXpath,
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            frame.click(fileChooserTriggerXpath),
        ]);
        await fileChooser?.accept(pathFiles);
    }

    async deleteFiles(pathFiles) {
        await pathFiles.forEach(async (pathFile) => {
            try {
                const fs = require("fs");
                await delay(0.3);
                await fs.unlinkSync(pathFile);
            } catch (e) { }
        });

        return true;
    }

    /**
     * Delay
     */
    async delay(selector) {
        return delay(Number(selector));
    }

    async delayMs(selector) {
        return delayMs(Number(selector));
    }

    async delayRandomMs(min, max) {
        return delayMs(Number(random(min, max)));
    }

    async delayRandom(min, max) {
        return delay(Number(random(min, max)));
    }

    async getContent(selector) {
        return this.page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return element.textContent.trim();
        }, selector);
    }

    async mouseWheelY(min, max = -1) {
        if (max == -1) {
            max = min;
        }
        await this.page.mouse.wheel({ deltaY: random(min, max) });
    }

    async mouseMove(x, y) {
        await this.page.mouse.move(x, y);
    }

    async mouseClick() {
        await this.page.mouse.click();
    }

    async getSizeWindow() {
        return await this.page.evaluate(() => {
            return {
                w: document.documentElement.clientWidth, h: document.documentElement.clientHeight
            }
        });
    }

    async getSizeWindowInner() {
        return await this.page.evaluate(() => {
            return {
                w: document.body.scrollWidth, h: document.body.scrollHeight
            }
        });
    }

    async getSizeWindowBody() {
        return await this.page.evaluate(() => {
            return {
                w: document.body.scrollWidth, h: document.body.scrollHeight
            }
        });
    }

    async scrollRandDown({ delayMin = 200, delayMax = 4000 }, { stepMin = 50, stepMax = 400 }, { loopMin = 1, loopMax = 6 }) {
        const maxLoop = random(loopMin, loopMax);
        let poision = { x: null, y: null };
        for (let i = 0; i < maxLoop; i++) {
            await this.delayRandomMs(delayMin, delayMax);
            const _random = random(stepMin, stepMax);
            await this.page.mouse.wheel({ deltaY: _random });
            poision = await this.page.evaluate(() => {
                const x = window.scrollX;
                const y = window.scrollY;
                return { x, y };
            });
        }
        return poision;
    }

    async scrollRandUp({ delayMin = 200, delayMax = 4000 }, { stepMin = 50, stepMax = 400 }, { loopMin = 1, loopMax = 6 }) {
        const maxLoop = random(loopMin, loopMax);
        let poision = { x: null, y: null };
        for (let i = 0; i < maxLoop; i++) {
            await this.delayRandomMs(delayMin, delayMax);
            const _random = random(stepMin, stepMax);
            await this.page.mouse.wheel({ deltaY: _random });
            poision = await this.page.evaluate(() => {
                const x = window.scrollX;
                const y = window.scrollY;
                return { x, y };
            });

        }
        return poision;
    }

    async scrollRandUpDownScore(scoreDown, { delayMin = 200, delayMax = 4000 }, { stepMin = 50, stepMax = 400 }, { loopMin = 1, loopMax = 6 }) {
        const maxLoop = random(loopMin, loopMax);
        let poision = { x: null, y: null };
        for (let i = 0; i < maxLoop; i++) {
            await this.page.mouse.move(
                random(20, 500), random(100, 300)
            );
            await this.delayRandomMs(delayMin / 2, delayMax / 2);
            let _random = random(stepMin, stepMax);
            if (!randomScore(scoreDown)) _random = -_random;
            this.page.mouse.wheel({ deltaY: _random });
            await this.delayRandomMs(delayMin / 2, delayMax / 2);
            poision = await this.page.evaluate(() => {
                const x = window.scrollX;
                const y = window.scrollY;
                return { x, y };
            });
            //  console.log(i + " scrollRandUpDownScore : " + scoreDown + " .Delay :" + delayMin + "-" + delayMax + " .Max : " + maxLoop + " .Position :" + poision.x + "-" + poision.y);
        }
        return poision;
    }

    async scrollRandUpDownScoreRollBack(scoreDown, { delayMin = 200, delayMax = 4000 }, { stepMin = 50, stepMax = 400 }, { loopMin = 1, loopMax = 6 }, enableScrollBack = true) {
        const maxLoop = random(loopMin, loopMax);
        let poision = { x: null, y: null };
        let old_y = 0;
        for (let i = 0; i < maxLoop; i++) {
            await this.page.mouse.move(
                random(50, 500), random(100, 300)
            );
            await this.delayRandomMs(delayMin / 2, delayMax / 2);
            let _random = random(stepMin, stepMax);
            if (!randomScore(scoreDown)) _random = -_random;
            this.page.mouse.wheel({ deltaY: _random });
            await this.delayRandomMs(delayMin / 2, delayMax / 2);
            poision = await this.page.evaluate(() => {
                const x = window.scrollX;
                const y = window.scrollY;
                return { x, y };
            });
            if (enableScrollBack) {
                const size = await this.getSizeWindow();
                const body = await this.getSizeWindowBody();

                if (old_y === poision.y && Math.abs(poision.y) < 20) {
                    console.log("------------------Start ");
                    scoreDown = scoreDown > 50 ? scoreDown : 100 - scoreDown;
                }
                if (old_y === poision.y && old_y > size.h) {
                    //end-page
                    scoreDown = scoreDown > 50 ? 100 - scoreDown : scoreDown;
                    console.log("------------------end ", body, size);
                }
                //   console.log(i + " scrollRandUpDownScore : " + scoreDown + " .Delay :" + delayMin + "-" + delayMax + " .Max : " + maxLoop + " .Position :" + poision.x + "-" + poision.y);
            }
            old_y = poision.y;
        }
        return poision;
    }

    async clickTryCheck(selectorTarget, selectorCheck, loop = 5, delay = 1) {
        for (let i = 0; i < loop; i++) {
            await this.click(selectorTarget);
            await this.delay(delay);
            if (await this.checkSelector(selectorCheck)) {
                break;
            }
        }
    }

    checkSelector(params) {
        return this.page.evaluate((params) => {
            return document.querySelector(params) === null ? false : true;
        }, params);
    }

    checkDisabledSelector(params, attribute = "disabled") {
        return this.page.evaluate(({ params, attribute }) => {
            return document.querySelector(params).hasAttribute(attribute)
                ? true
                : false || false;
        }, { params, attribute });
    }

    getAttributeSelector(params, attribute = "disabled") {
        return this.page.evaluate(({ params, attribute }) => {
            const exist = document.querySelector(params).hasAttribute(attribute) || false;
            if (exist) {
                const a = document.querySelector(params).getAttribute(attribute);
                if (a === "true") return true;
                if (a === "false") return false;
                return a || false;
            }
            return false;

        }, { params, attribute });
    }

    checkExistId(id) {
        return this.page.evaluate((id) => {
            var myElement = document.getElementById(id);
            if (myElement) return true;
            return false;
        }, id);
    }

    getContentSelector(selector) {
        return this.page.evaluate((selector) => {
            var element = document.querySelector(selector);
            if (element) {
                return element.textContent.trim();
            }
            return false;
        }, selector);
    }

    getContentSelectorAll(selector) {
        return this.page.evaluate((selector) => {
            var elements = document.querySelectorAll(selector);

            let data = [];
            if (elements) {
                for (let i = 0; i < elements.length; i++) {
                    // data.push(elements[i].textContent.trim());
                }
                return data;
            }
            return false;
        }, selector);
    }

    async getQuerySelectorAll(selector) {

        return await this.page.evaluate((selector) => {
            var elements = document.querySelectorAll(selector);
            let e = [];
            if (elements) {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i]?.href.search("google") < 0) {
                        e.push(elements[i]?.href);
                    }
                }
                return e;
            }
            return false
        }, selector);
    }

    async scrollSelectorView(selector) {
        return await this.page.evaluate(async ({ selector }) => {
            var elements = document.querySelector(selector);
            if (elements) {
                await elements.scrollIntoView({ behavior: 'smooth' });
                // await delayRandomMs(1000, 4000);
                if (document.documentElement.clientWidth < 500) await elements.tab();
                else await elements.click();
                return true;
            }
            return false

        }, { selector });
    }

    async clickHref(selector, options = {}) {
        try {
            await this.page.hover(selector);
            await this.delayRandomMs(400, 1500);
            if (await this.UA() == "mobie") {
                await this.page.tab();
            }
            else {
                await this.page.mouse.down(options);
                await this.delayRandomMs(50, 500);
                await this.page.mouse.up(options);
            }
        } catch (error) {
            try {
                await this.page.hover(selector);
            } catch (error) {

            }

            await this.delayRandomMs(1000, 2500);
            return this.clickHrefElement(selector);
        }
        await this.delayRandomMs(400, 1200);
    }

    async clickHrefElement(selector) {
        return await this.page.evaluate(async ({ selector }) => {
            var elements = document.querySelector(selector);
            if (elements) {
                if (document.documentElement.clientWidth < 500) await elements.tab();
                else await elements.click();
                return true;
            }
            return false

        }, { selector });
    }

    getAllHrefSelector(selector) {
        return this.page.evaluate((selector) => {
            var element = document.querySelector(selector);
            if (element) {
                return element.href;
            }
            return false;
        }, selector);
    }

    selectDate(selector, day) {
        return this.page.evaluate(
            ({ selector, day }) => {
                var tags = document.querySelectorAll(selector);
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i].textContent.trim() == day.toString()) {
                        tags[i].click();
                    }
                }
                return false;
            },
            { selector, day }
        );
    }

    async UA() {
        const dimensions = await this.page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
            };
        });
        //console.log('Dimensions:', dimensions.width);
        if (dimensions.width < 500) {
            return 'mobie';
        } else {
            return 'computer';
        }
    }

    async location() {
        const currentUrl = () => {
            return window.location.href;
        };
        return await this.page.evaluate(currentUrl);
    }

    async isUrlCurrent(url) {
        const href = await this.location();
        return href.search(url) >= 0;
    }
}

module.exports = PuppeteerActionFunc;