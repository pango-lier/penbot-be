import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { CoreService } from '../core/core.service';

interface IBrowserStart {
  browser: Browser;
  core: CoreService;
  page: Page;
}

@Injectable()
export class BrowserService {
  async StartUp(): Promise<IBrowserStart> {
    const browser = await this.start();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 937 });
    const core = new CoreService(page);
    return { browser, core, page };
  }

  async start(): Promise<Browser> {
    return await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: true,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      // executablePath: process.env.CHROME_BIN,
      args: [
        '--no-sandbox',
        // "--headless",
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
      ],
    });
  }

  async stop(browser: Browser) {
    return await browser.close();
  }
}
