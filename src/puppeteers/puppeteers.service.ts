import { Injectable } from '@nestjs/common';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';
import { FacebookService } from './facebook/facebook.service';
import { CreateFacebookPostArticleDto } from './facebook/dto/create-facebook-post-article.dto';
import { addTagsToString } from '../utils/addTagsToString';
import { QueueDataFacebookDto } from './facebook/dto/create-facebook.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ArticlesService } from '../articles/articles.service';
import { YoutubeService } from './youtube/youtube.service';
import { Article } from '@articles/entities/article.entity';
import { SocialEnum } from '@socials/entities/social.enum';
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

  async runMethodQueue(data: QueueDataFacebookDto) {
    await this[data.actionMethod](data);
  }

  async posArticle(articles: Article[], userIds: Array<number>) {
    await this.browserQueue.add('post-article-service', articles, {
      jobId: `profile_${
        userIds[0]
      }_${new Date().getTime()}_${randomstring.generate(6)}`,
    });
  }

  async createPostArticle(articles: Article[]) {
    console.log('createPostArticle');
    const articleFull = await this.articleService.findIds(
      articles?.map((i) => i.id),
    );
    for (const article of articleFull) {
      const imagePaths = article.files.map((i) => i.local);
      for (const socialTargetArticle of article.socialTargetArticles) {
        const socialTarget = socialTargetArticle.socialTarget;
        const create: CreateFacebookPostArticleDto = {
          username: socialTarget.social.username,
          password: socialTarget.social.password,
          imagePaths,
          content: addTagsToString(article.title, article.tags),
          target: socialTarget.link,
        };
        if (SocialEnum.FACEBOOK === socialTarget.social.socialType) {
          const response = await this.facebookService.createPostArticle(create);
        }
      }
    }
  }
}
