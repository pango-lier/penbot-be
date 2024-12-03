import { Injectable } from '@nestjs/common';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { BrowserService } from '@puppeteers/browser/browser.service';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class InstagramService {
  constructor(private readonly browser: BrowserService) {}

  create(createInstagramDto: CreateInstagramDto) {
    return 'This action adds a new instagram';
  }

  findAll() {
    return `This action returns all instagram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instagram`;
  }

  update(id: number, updateInstagramDto: UpdateInstagramDto) {
    return `This action updates a #${id} instagram`;
  }

  remove(id: number) {
    return `This action removes a #${id} instagram`;
  }

  // @Timeout(5)
  async createPost(
    input: { content: string; imagePaths: string[] } = {
      content: 'test test test',
      imagePaths: ['/home/trong/Desktop/b3.jpg'],
    },
  ) {
    const page = await this.browser.StartUp({
      userDataDir: '/home/profiles/instagram',
    });
    //'div:nth-child(7) > .x1n2onr6 > .x4k7w5x > .x1n2onr6 > .x1i10hfl > .x9f619'
    await page.core.goto('https://www.instagram.com/');
    await page.core.delay(2);
    await page.core.click(
      'div:nth-child(7) > .x1n2onr6 > .x4k7w5x > .x1n2onr6 > .x1i10hfl > .x9f619',
    );
    await page.core.delay(1);
    console.log('click post');
    await page.core.clickContentSelectorMatch('span', ['Post', 'Bài viết']);

    await page.core.delay(1);
    console.log('Upload file');
    await page.core.uploadImageTrigger(
      input.imagePaths,
      page.core.clickContentSelectorMatch('button', ['Select from computer']),
    );
    console.log('click Next');
    await page.core.delay(2);
    await page.core.clickContentSelectorMatch('div[role="button"]', [
      'Next',
      'Tiếp',
    ]);
    await page.core.delay(1);
    console.log('click Next2');
    await page.core.clickContentSelectorMatch('div[role="button"]', [
      'Next',
      'Tiếp',
    ]);
    await page.core.delay(2);
    console.log('click Write a caption');
    await page.core.click('div[aria-placeholder="Write a caption..."]');
    await page.core.click('div[aria-placeholder="Write a caption..."]');
    await page.core.click('div[aria-placeholder="Write a caption..."]');
    await page.core.click('div[aria-placeholder="Write a caption..."]');
    await page.core.click('div[aria-placeholder="Write a caption..."]');
    console.log('Write a caption');
    await page.core.input(input.content, '', 1000);
    console.log('Location'); // fix not update contetnt
    await page.core.click('input[placeholder="Add location"]');
    await page.core.click('input[placeholder="Add location"]');
    await page.core.click('input[placeholder="Add location"]');
    await page.core.delay(2);
    console.log('Share');
    await page.core.clickContentSelectorMatch('div[role="button"]', [
      'Share',
      'Chia sẻ',
    ]);
    await page.core.delay(15);
  }
}
