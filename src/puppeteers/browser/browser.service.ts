import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { CoreService } from '../core/core.service';
export interface IBrowserArgs {
  userDataDir?: string;
  [key: string]: string | number;
}

interface IBrowserStart {
  browser: Browser;
  core: CoreService;
  page: Page;
}

@Injectable()
export class BrowserService {
  private browser: Browser;
  async StartUp(argObs?: IBrowserArgs): Promise<IBrowserStart> {
    const browser = await this.start(argObs);
    const page = await browser.newPage();

    const core = new CoreService(page);
    await core.page.setViewport({ width: 1920, height: 937 });
    this.browser = browser;
    return { browser, core, page };
  }

  async start(argObs: IBrowserArgs = {}): Promise<Browser> {
    const args = [];
    if (argObs.userDataDir) {
      args.push(`--user-data-dir=${argObs.userDataDir}`);
    }
    return await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: true,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      // devtools: true,
      executablePath: process.env.CHROME_BIN,
      args: [
        '--no-sandbox',
        '--headless',
        // "--disable-gpu",
        '--disable-dev-shm-usage',
        '--disable-backgrounding-occluded-windows',
        '--disable-backing-store-limit',
        // '--user-data-dir=/home/trong/.config/google-chrome/profile3',
        '--tz=Asia/Bangkok',
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
