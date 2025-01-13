import { Injectable } from '@nestjs/common';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';
import { FacebookService } from './facebook/facebook.service';
import { CreateFacebookPostArticleDto } from './facebook/dto/create-facebook-post-article.dto';
import { addTagsToString } from '../utils/addTagsToString';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ArticlesService } from '../articles/articles.service';
import { YoutubeService } from './youtube/youtube.service';
import { Article } from '@articles/entities/article.entity';
import { SocialEnum } from '@socials/entities/social.enum';
import { SocialTarget } from '@social-targets/entities/social-target.entity';
import { SocialTargetsService } from '@social-targets/social-targets.service';
import { SocialTargetArticlesModule } from '@social-target-articles/social-target-articles.module';
import { SocialTargetArticlesService } from '@social-target-articles/social-target-articles.service';
import { UpdateSocialTargetArticleDto } from '@social-target-articles/dto/update-social-target-article.dto';
import { SocialTargetArticleStatusEnum } from '@social-target-articles/entities/social-target-article.enum';
const randomstring = require('randomstring');

@Injectable()
export class PuppeteersService {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly socialTargetService: SocialTargetsService,
    private readonly articleService: ArticlesService,
    private readonly socialTargetArticleService: SocialTargetArticlesService,
    @InjectQueue('write-log') private readonly writeLog: Queue,
    @InjectQueue('browser') private readonly browserQueue: Queue,
  ) {}

  async posArticle(
    articles: Article[],
    socialTargets: SocialTarget[],
    userId: number,
  ) {
    await this.browserQueue.add('createPostArticle', articles, {
      jobId: `profile_${userId}_${new Date().getTime()}_${randomstring.generate(
        6,
      )}`,
    });
  }

  async syncArticle(articles: Article[], userId: Array<number>) {
    await this.browserQueue.add('createPostArticle', articles, {
      jobId: `profile_${userId}_${new Date().getTime()}_${randomstring.generate(
        6,
      )}`,
    });
  }

  async createPostArticle({
    articles,
    socialTargets,
  }: {
    articles: Article[];
    socialTargets: SocialTarget[];
  }) {
    console.log('createPostArticle');

    for (const article of articles) {
      const articleFull = await this.articleService.findFullData(article.id);
      const imagePaths = articleFull.files.map((i) => i.local);

      for (const socialTarget of socialTargets) {
        await this.socialTargetArticleService.startArticle(
          socialTarget,
          articleFull,
        );
        try {
          if (SocialEnum.FACEBOOK === socialTarget.social.socialType) {
            const socialTargetFull = await this.socialTargetService.findProxy(
              socialTarget.id,
            );
            await this.facebookService.createPostArticle(
              {
                username: socialTargetFull.social.username,
                password: socialTargetFull.social.password,
                imagePaths,
                content: addTagsToString(article.title, article.tags),
                target: socialTargetFull.link,
              },
              socialTargetFull.social.proxy,
            );
          }
          await this.socialTargetArticleService.endArticle(socialTarget, {
            message: null,
            status: SocialTargetArticleStatusEnum.Error,
          });
        } catch (error) {
          await this.socialTargetArticleService.endArticle(socialTarget, {
            message: error?.message || null,
            status: SocialTargetArticleStatusEnum.Success,
          });
        }
      }
    }
  }
}
