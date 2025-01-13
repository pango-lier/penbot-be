import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { CoreService } from '../core/core.service';
import { Proxy } from '@users/proxies/entities/proxy.entity';
export interface IBrowserArgs {
  userDataDir?: string;
  executablePath?: string;
  headless?: boolean;
  [key: string]: string | number | boolean;
}

interface IBrowserStart {
  browser: Browser;
  core: CoreService;
  page: Page;
}

@Injectable()
export class BrowserService {
  private browser: Browser;
  async StartUp(argObs?: IBrowserArgs, proxy?: Proxy): Promise<IBrowserStart> {
    const browser = await this.start(argObs, proxy);
    const page = await browser.newPage();

    if (proxy && proxy.host && proxy.username && proxy.password) {
      await page.authenticate({
        username: proxy.username,
        password: proxy.password,
      });
    }

    const core = new CoreService(page, 0.3, 0.02);
    await core.page.setViewport({ width: 1920, height: 937 });
    this.browser = browser;
    return { browser, core, page };
  }

  async start(argObs: IBrowserArgs = {}, proxy?: Proxy): Promise<Browser> {
    const args = [];
    if (argObs.userDataDir) {
      args.push(`--user-data-dir=${argObs.userDataDir}`);
    }
    if (proxy && proxy.host) {
      let host = `${proxy.host}`;
      const regex = /:\d+$/;
      const hasPort = regex.test(`${host}`);
      if (!hasPort && proxy.port) {
        host = `${host}:${proxy.port}`;
      }

      args.push(`--proxy-server=${host}`);
    }
    return await puppeteer.launch({
      executablePath: argObs.executablePath
        ? argObs.executablePath
        : process.env.CHROME_BIN ?? undefined, //,
      headless: argObs?.headless || false,
      // ignoreDefaultArgs: true,
      ignoreHTTPSErrors: true,
      // defaultViewport: null,
      // devtools: true,
      // executablePath: process.env.CHROME_BIN,
      args: [
        '--no-sandbox',
        // '--headless',
        // "--disable-gpu",
        '--disable-dev-shm-usage',
        '--disable-backgrounding-occluded-windows',
        '--disable-backing-store-limit',
        // '--user-data-dir=/home/trong/.config/google-chrome/profile3',
        // '--tz=Asia/Bangkok',
        '--no-first-run',
        '--font-masking-mode=2',
        '--origin-trial-disabled-features=ConditionalFocus',
        '--password-store=basic',
        '--disable-encryption',
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--disable-notifications',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-background-networking',
        '--disable-features=RendererCodeIntegrity',
        ...args,
      ],
    });
  }

  async stop() {
    try {
      await this.browser.close();
    } catch (error) {}
  }
}
