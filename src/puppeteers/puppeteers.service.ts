import { Injectable } from '@nestjs/common';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';
import { FacebookService } from './facebook/facebook.service';
import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { Crawler } from '@crawlers/entities/crawler.entity';
import { CreateFacebookPostArticleDto } from './facebook/dto/create-facebook-post-article.dto';
import { Social } from '@socials/entities/social.entity';
import { SocialTarget } from '../social-targets/entities/social-target.entity';

@Injectable()
export class PuppeteersService {
  constructor(private readonly facebookService: FacebookService) {}

  create(createPuppeteerDto: CreatePuppeteerDto) {
    return 'This action adds a new puppeteer';
  }

  findAll() {
    return `This action returns all puppeteers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puppeteer`;
  }

  update(id: number, updatePuppeteerDto: UpdatePuppeteerDto) {
    return `This action updates a #${id} puppeteer`;
  }

  remove(id: number) {
    return `This action removes a #${id} puppeteer`;
  }

  async posArticle(
    crawler: Crawler,
    socialTargets: SocialTarget[],
    userIds: Array<number>,
  ) {
    for (const socialTarget of socialTargets) {
      const data: CreateFacebookPostArticleDto = {
        username: socialTarget.social.username,
        password: socialTarget.social.password,
        imagePaths: [crawler.linkDownloaded],
        content: crawler.name,
        target: socialTarget.link,
      };
      await this.facebookService.addQueue({
        actionMethod: 'createPostArticle',
        data,
        userIds,
      });
    }
  }
}
