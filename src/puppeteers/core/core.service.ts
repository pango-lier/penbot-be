import { Injectable } from '@nestjs/common';
import { HTTPResponse, KeyInput, Page, Puppeteer } from 'puppeteer';
import { delay, delayMs } from './until/delay';
import fs = require('fs');
import { random } from './until/random';

export class CoreService {
  page: Page;
  delayClickTime: number;
  delayTypingTime: number;
  constructor(page: Page, delayClickTime?: number, delayTypingTime?: number) {
    this.page = page;
    this.delayClickTime = delayClickTime || 0.3;
    this.delayTypingTime = delayTypingTime || 0.05;
  }

  async click(target: string): Promise<void> {
    console.log(this.delayClickTime);
    await delay(this.delayClickTime);
    await this.page.waitForSelector(target);
    return this.page.click(target);
  }

  async goto(url): Promise<HTTPResponse> {
    console.log(`goto >> ${url}`);
    return this.page.goto(url, {
      waitUntil: 'networkidle2',
    });
  }

  async enter(key: KeyInput = 'Enter') {
    return await this.page.keyboard.press(key);
  }
  /**
   * await a element show in DOM
   */
  async waitForSelector(selector) {
    return this.page.waitForSelector(selector);
  }
  /**
   * await a element Remove
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {ElementHandle<Element>}
   */
  /**
   * Type some text with speed per character is default 0,05s
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {void}
   */

  async location(): Promise<string> {
    const currentUrl = () => {
      return window.location.href;
    };

    return await this.page.evaluate(currentUrl);
  }

  async isUrlCurrent(url) {
    const href = await this.location();
    return href.search(url) >= 0;
  }

  async input(value, currentValue = '', delay = 1000): Promise<void> {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < currentValue.length; i++) {
      await this.page.keyboard.press('Backspace');
    }
    if (value !== null && value !== undefined && value !== 'null') {
      return this.page.keyboard.type(value, {
        delay: this.delayTypingTime * delay,
      });
    }
  }

  async uploadImage(
    imagePaths: string[],
    fileChooserTriggerXpath: string,
  ): Promise<string[]> {
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.click(fileChooserTriggerXpath),
    ]);
    await fileChooser?.accept(imagePaths);
    return imagePaths;
  }

  async uploadImageTrigger(
    imagePaths: string[],
    callback: Promise<void | boolean>,
  ): Promise<string[]> {
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      callback,
    ]);
    await fileChooser?.accept(imagePaths);
    return imagePaths;
  }

  async deleteFiles(pathFiles: string[]): Promise<boolean> {
    await pathFiles.forEach(async (pathFile) => {
      try {
        await delay(0.3);
        await fs.unlinkSync(pathFile);
      } catch (e) {}
    });

    return true;
  }

  async delay(s: number): Promise<unknown> {
    return delay(s);
  }

  async delayRandom(min, max): Promise<unknown> {
    return delay(random(min, max));
  }

  async delayMsRandom(min, max): Promise<unknown> {
    return delayMs(random(min, max));
  }

  async getContent(selector): Promise<string> {
    return this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element.textContent.trim();
    }, selector);
  }

  async mouseWheelY(min: number, max = -1) {
    if (max == -1) {
      max = min;
    }
    await this.page.mouse.wheel({ deltaY: random(min, max) });
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

  checkSelectors(selectors: string[]) {
    return this.page.evaluate((selectors) => {
      let res: string | boolean = false;
      for (const selector of selectors) {
        res = document.querySelector(selector) === null ? false : selector;
        if (res) return res;
      }
      return res;
    }, selectors);
  }

  checkDisabledSelector(params, attribute = 'disabled') {
    return this.page.evaluate((params) => {
      return document.querySelector(params).hasAttribute(attribute)
        ? true
        : false || false;
    }, params);
  }

  checkExistId(id) {
    return this.page.evaluate((id) => {
      const myElement = document.getElementById(id);
      if (myElement) return true;
      return false;
    }, id);
  }

  getContentSelector(selector) {
    return this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
      return false;
    }, selector);
  }

  getContentSelectorAll(selector) {
    return this.page.evaluate((selector) => {
      const elements = document.querySelectorAll(selector);
      const data = [];
      if (elements) {
        for (let i = 0; i < elements.length; i++) {
          data.push(elements[i].textContent.trim());
        }
        return data;
      }
      return false;
    }, selector);
  }

  clickContentSelectorMatch(selector, contents) {
    return this.page.evaluate(
      ({ selector, contents }) => {
        const elements = document.querySelectorAll(selector);
        if (elements) {
          for (let i = 0; i < elements.length; i++) {
            contents.forEach((content) => {
              console.log(elements[i].textContent.trim);
              if (content.toString() === elements[i].textContent.trim())
                return elements[i].click();
            });
          }
        }
        return false;
      },
      { selector, contents },
    );
  }

  getHrefSelector(selector) {
    return this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        return element.href;
      }
      return false;
    }, selector);
  }

  selectDate(selector, day) {
    return this.page.evaluate(
      ({ selector, day }) => {
        const tags = document.querySelectorAll(selector);
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].textContent.trim() == day.toString()) {
            tags[i].click();
          }
        }
        return false;
      },
      { selector, day },
    );
  }

  async try(callback, loop = 4, delay_ms = 1000) {
    for (let i = 0; i < loop; i++) {
      try {
        const value = await callback();
        console.log(value);
        if (value) {
          return value;
        }
      } catch (error) {
        console.log('try error ' + error.message);
      }
      await delayMs(delay_ms);
    }
    return false;
  }

  getAttributeSelector(params, attribute = 'disabled') {
    return this.page.evaluate(
      ({ params, attribute }) => {
        const exist =
          document.querySelector(params).hasAttribute(attribute) || false;
        if (exist) {
          const a = document.querySelector(params).getAttribute(attribute);
          if (a === 'true') return true;
          if (a === 'false') return false;
          return a || false;
        }
        return false;
      },
      { params, attribute },
    );
  }
}
