import { Injectable } from '@nestjs/common';
import { CreatePinterestDto } from './dto/create-pinterest.dto';
import { UpdatePinterestDto } from './dto/update-pinterest.dto';
import { BrowserService } from '@puppeteers/browser/browser.service';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class PinterestService {
  constructor(private readonly browser: BrowserService) {}

  create(createPinterestDto: CreatePinterestDto) {
    return 'This action adds a new pinterest';
  }

  findAll() {
    return `This action returns all pinterest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pinterest`;
  }

  update(id: number, updatePinterestDto: UpdatePinterestDto) {
    return `This action updates a #${id} pinterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} pinterest`;
  }

  // @Timeout(3)
  async createPin(
    input: {
      content: string;
      imagePaths: string[];
      pin?: string;
      link?: string;
      title?: string;
    } = {
      content: 'test test test',
      imagePaths: ['/home/trong/Desktop/b3.jpg'],
      pin: 'Bags',
      link: 'https://gitlab.com/',
      title: 'title',
    },
  ) {
    const page = await this.browser.StartUp({
      userDataDir: '/home/profiles/pinterest',
    });
    //'div:nth-child(7) > .x1n2onr6 > .x4k7w5x > .x1n2onr6 > .x1i10hfl > .x9f619'
    await page.core.goto('https://www.pinterest.com/pin-builder');
    await page.core.delay(2);
    await page.core.uploadImageTrigger(
      input.imagePaths,
      page.core.click('input[aria-label="File upload"]'),
    );
    console.log('click title');
    await page.core.delay(1);
    await page.core.click('textarea[placeholder="Add your title"]');
    await page.core.delay(1);
    await page.core.input(input.title, '', 1000);

    console.log('add description');
    await page.core.delay(1);
    await page.core.click('#dweb-comment-editor-container');
    await page.core.delay(1);
    await page.core.input(input.content, '', 1000);

    console.log('Add link');
    await page.core.delay(1);
    await page.core.click('textarea[placeholder="Add a destination link"]');
    await page.core.delay(1);
    await page.core.input(input.link, '', 1000);
    // console.log('click post');

    if (input.pin) {
      await page.core.delay(2);
      console.log('Select Pin');
      await page.core.clickContentSelectorMatch(`div[title="${input.pin}"]`, [
        `${input.pin}`,
      ]);
    }

    await page.core.delay(2);
    console.log('Publish');
    await page.core.clickContentSelectorMatch('button', ['Publish']);
    await page.core.delay(5);
    try {
      await page.core.click('button[aria-label="dismiss"]');
    } catch (error) {}

    await page.core.delay(5);
  }
}
