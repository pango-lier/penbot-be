import { Injectable } from '@nestjs/common';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';
import { FacebookService } from './facebook/facebook.service';
import { CrawlerLink } from '@crawlers/crawler-links/entities/crawler-link.entity';
import { Crawler } from '@crawlers/entities/crawler.entity';
import { CreateFacebookPostArticleDto } from './facebook/dto/create-facebook-post-article.dto';
import { Social } from '@socials/entities/social.entity';
import { SocialTarget } from '../social-targets/entities/social-target.entity';
import { addTagsToString } from '../utils/addTagsToString';
import { QueueDataFacebookDto } from './facebook/dto/create-facebook.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CrawlersService } from '../crawlers/crawlers.service';
import { ArticlesService } from '../articles/articles.service';
import { PostArticlePuppeteerDto } from './dto/create-article-puppeteer.dto';
import { YoutubeService } from './youtube/youtube.service';
const randomstring = require('randomstring');

@Injectable()
export class PuppeteersService {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly youtubeService: YoutubeService,
    private readonly articleService: ArticlesService,
    @InjectQueue('write-log') private readonly writeLog: Queue,
    @InjectQueue('browser') private readonly browserQueue: Queue,
  ) {}

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

  async addFacebookQueue(data: QueueDataFacebookDto) {
    await this.browserQueue.add('facebook-service', data, {
      jobId: `profile_fb${
        data.userIds[0]
      }_${new Date().getTime()}_${randomstring.generate(6)}`,
    });
  }

  async runMethodQueue(data: QueueDataFacebookDto) {
    await this[data.actionMethod](data);
  }

  async posArticle(
    postArticle: PostArticlePuppeteerDto,
    userIds: Array<number>,
  ) {
    await this.addFacebookQueue({
      actionMethod: 'createFacebookPostArticle',
      data: postArticle,
      userIds,
    });
  }

  async createFacebookPostArticle(data: QueueDataFacebookDto) {
    const articles = await this.articleService.findIds(data.data.articleIds);

    for (const article of articles) {
      const imagePaths = article.links.map((i) => i.urlLocal);
      for (const socialTarget of article.socialTargets) {
        const create: CreateFacebookPostArticleDto = {
          username: socialTarget.social.username,
          password: socialTarget.social.password,
          imagePaths,
          content: addTagsToString(article.title, article.tags),
          target: socialTarget.link,
        };
        const response = await this.facebookService.createPostArticle(create);
      }
    }
  }
}
