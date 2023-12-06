import { Injectable } from '@nestjs/common';
import { CreateGoogleSearchConsoleDto } from './dto/create-google-search-console.dto';
import { UpdateGoogleSearchConsoleDto } from './dto/update-google-search-console.dto';
import { BrowserService } from '@puppeteers/browser/browser.service';
import * as SITE_MAP from './data/sitemap.json';
import { createLocalFile } from '@utils/file/fetchVideo';

@Injectable()
export class GoogleSearchConsoleService {
  constructor(private readonly browser: BrowserService) {}

  create(createGoogleSearchConsoleDto: CreateGoogleSearchConsoleDto) {
    return 'This action adds a new googleSearchConsole';
  }

  // findAll() {
  //   return `This action returns all googleSearchConsole`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} googleSearchConsole`;
  }

  update(
    id: number,
    updateGoogleSearchConsoleDto: UpdateGoogleSearchConsoleDto,
  ) {
    return `This action updates a #${id} googleSearchConsole`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleSearchConsole`;
  }

  async findAll() {
    try {
      const dirProfile = createLocalFile(
        'printway_' + 'library',
        `/tmp/trong/profiles/google`,
      );
      const { core } = await this.browser.StartUp({
        profile: 'google-search-console-index',
        userDataDir: dirProfile,
        executablePath:
          '/home/trong/.gologin/browser/orbita-browser-107/chrome',
      });

      for (let index = 0; index < SITE_MAP.urlset.url.length; index++) {
        const element = SITE_MAP.urlset.url[index];
        console.warn(`${index}.${element.loc}`);
        await this.requestIndex(element.loc, core);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async requestIndex(url, core) {
    await core.goto(
      'https://search.google.com/search-console/index?resource_id=sc-domain%3Acutom.us&hl=en',
    );
    await core.delay(1);
    await core.click('.TMT2L > .Mxgq5c > .L6J0Pc > .d1dlne > .Ax4B8');
    await core.delay(0.2);
    await core.input(url);
    // console.log(search);
    await core.delay(1);
    await core.enter();
    await core.delay(5);
    console.log('delay(3)');
    const indexTed2 = await core.getAttributeSelector(
      '.uwtVyc c-wiz:nth-child(1) > .CerIhf > span > div',
      'aria-disabled',
    );
    console.log('Indexted2 :' + indexTed2);
    if (!indexTed2) return 0;
    await core.click(
      '.uwtVyc c-wiz:nth-child(2) > .CerIhf > span > .U26fgb > .ZFr60d',
    );
    for (let index = 0; index < 25; index++) {
      const indexTed = await core.getAttributeSelector(
        '.uwtVyc c-wiz:nth-child(1) > .CerIhf > span > div',
        'aria-disabled',
      );

      console.log('Indexted :' + indexTed);
      await core.delay(2);
      if (!indexTed) break;
      // const gotIt = await core.checkSelector(
      //   '.g3VIld > .XfpsVe > .U26fgb > .CwaK9 > .RveJvd',
      // );
      // console.log('gotIt :' + gotIt);
      // if (gotIt) break;
    }
    console.log('success');
  }
}
