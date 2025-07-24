import { Injectable } from '@nestjs/common';
import { CreateEtsyDto } from './dto/create-etsy.dto';
import { UpdateEtsyDto } from './dto/update-etsy.dto';
import { Article } from '@articles/entities/article.entity';
import { SocialTarget } from '@social-targets/entities/social-target.entity';
import { BrowserService } from '@puppeteers/browser/browser.service';

@Injectable()
export class EtsyService {
  constructor(private readonly browser: BrowserService) {}

  create(createEtsyDto: CreateEtsyDto) {
    return 'This action adds a new etsy';
  }

  findAll() {
    return `This action returns all etsy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} etsy`;
  }

  update(id: number, updateEtsyDto: UpdateEtsyDto) {
    return `This action updates a #${id} etsy`;
  }

  remove(id: number) {
    return `This action removes a #${id} etsy`;
  }

  async spamAds(article: Article, socialTarget: SocialTarget) {
    const page = await this.browser.launch(socialTarget?.social?.proxy);
    await page.core.goto('https://www.etsy.com/');
    await page.core.delay(2);
    await this.browser.stop();
    return `This action remov etsy`;
  }
}
