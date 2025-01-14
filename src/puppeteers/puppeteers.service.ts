import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { InstagramService } from '@instagram/instagram.service';
const randomstring = require('randomstring');

@Injectable()
export class PuppeteersService {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly instagramService: InstagramService,
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
    await this.browserQueue.add(
      'createPostArticle',
      { articles, socialTargets, userId },
      {
        jobId: `profile_${userId}_${new Date().getTime()}_${randomstring.generate(
          6,
        )}`,
      },
    );
    return true;
  }

  async syncArticle(articles: Article[], userId: Array<number>) {
    await this.browserQueue.add(
      'createPostArticle',
      { articles, userId },
      {
        jobId: `profile_${userId}_${new Date().getTime()}_${randomstring.generate(
          6,
        )}`,
      },
    );
  }

  async createPostArticle({
    articles,
    socialTargets,
  }: {
    articles: Article[];
    socialTargets: SocialTarget[];
  }) {
    for (const article of articles) {
      const articleFull = await this.articleService.findFullData(article.id);

      for (const socialTargetValue of socialTargets) {
        const socialTargetArticle =
          await this.socialTargetArticleService.startArticle(
            socialTargetValue,
            articleFull,
          );

        try {
          const socialTargetFull = await this.socialTargetService.findProxy(
            socialTargetValue.id,
          );

          switch (socialTargetFull.social.socialType) {
            case SocialEnum.FACEBOOK:
              await this.facebookService.createPostArticle(
                articleFull,
                socialTargetFull,
              );
              break;
            case SocialEnum.INSTAGRAM:
              await this.instagramService.createPostArticle(
                articleFull,
                socialTargetFull,
              );

              break;
            case SocialEnum.PINTEREST:
              await this.instagramService.createPostArticle(
                articleFull,
                socialTargetFull,
              );

              break;
            default:
              throw new HttpException(
                `Create article is not support for ${socialTargetFull.social.socialType}`,
                HttpStatus.BAD_REQUEST,
              );
              break;
          }

          await this.socialTargetArticleService.endArticle(
            socialTargetArticle,
            {
              message: null,
              status: SocialTargetArticleStatusEnum.Success,
            },
          );
        } catch (error) {
          await this.socialTargetArticleService.endArticle(
            socialTargetArticle,
            {
              message: error?.message || error || null,
              status: SocialTargetArticleStatusEnum.Error,
            },
          );
        }
      }
    }
  }
}
