import { Injectable } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { In, Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RunCrawlerQueueDto } from './dto/run-crawler-queue.dto';
import { CrawlerLinksService } from './crawler-links/crawler-links.service';
import { CrawlerLink } from './crawler-links/entities/crawler-link.entity';
import { CrawlerLinkStatusEnum } from './crawler-links/entities/crawler-link.enum';
import { YoutubeDlService } from './youtube-dl/youtube-dl.service';
import { PaginateService } from '@paginate/paginate.service';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PuppeteersService } from '@puppeteers/puppeteers.service';
import { SocialTarget } from '../social-targets/entities/social-target.entity';
import { ArticlesService } from '../articles/articles.service';
import { CreateArticleDto } from '../articles/dto/create-article.dto';
import { ArticleStatusEnum } from '../articles/entities/article-status.enum';
import { LinkEnum } from '../links/entities/link.enum';
import { YoutubeService } from '../puppeteers/youtube/youtube.service';
import { delay } from '../puppeteers/core/until/delay';

@Injectable()
export class CrawlersService {
  constructor(
    @InjectRepository(Crawler) private readonly crawler: Repository<Crawler>,
    @InjectRepository(SocialTarget)
    private readonly social: Repository<SocialTarget>,
    private readonly crawlerLinkService: CrawlerLinksService,
    private readonly articleService: ArticlesService,
    @InjectQueue('crawler') private readonly crawlerQueue: Queue,
    @InjectQueue('write-log') private readonly writeLogQueue: Queue,
    private readonly paginateService: PaginateService,
    private readonly youtubeDlService: YoutubeDlService,
    private readonly puppeteerService: PuppeteersService,
    private readonly youtubeService: YoutubeService,
  ) {}

  async create(createCrawlerDto: CreateCrawlerDto, userId: number) {
    const create = this.crawler.create(createCrawlerDto);
    create.userId = userId;
    if (createCrawlerDto?.socialTargetIds) {
      create.socialTargets = await this.social.findBy({
        id: In(createCrawlerDto.socialTargetIds),
      });
    }
    return this.crawler.save(create);
  }

  findAll(paginate: IPaginate, userId: number) {
    const query = this.crawler.createQueryBuilder('crawler');
    return this.paginateService.queryFilter(query, paginate, [], {
      getQuery: 'getMany',
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} crawler`;
  }

  async update(id: number, updateCrawlerDto: UpdateCrawlerDto) {
    const update = await this.crawler.findOneBy({ id });
    update.description = updateCrawlerDto.description;
    update.meta = updateCrawlerDto.meta;
    update.name = updateCrawlerDto.name;
    update.tags = updateCrawlerDto.tags;
    update.type = updateCrawlerDto.type;
    update.linkDownloaded = updateCrawlerDto.linkDownloaded;
    update.links = updateCrawlerDto.links;
    if (updateCrawlerDto?.socialTargetIds) {
      update.socialTargets = await this.social.findBy({
        id: In(updateCrawlerDto.socialTargetIds),
      });
    }
    return this.crawler.save(update);
  }

  remove(id: number) {
    return this.crawler.softDelete(id);
  }

  async runQueueCrawler(runCrawler: RunCrawlerQueueDto, userId: number) {
    const crawlerLinks: CrawlerLink[] = [];
    for (const crawlerLinkDto of runCrawler?.crawlerLinks || []) {
      crawlerLinks.push(
        await this.crawlerLinkService.create(crawlerLinkDto, userId),
      );
    }

    for (const crawlerLinkDto of runCrawler?.crawlerLinkIds || []) {
      crawlerLinks.push(await this.crawlerLinkService.findOne(crawlerLinkDto));
    }

    for (const crawlerLink of crawlerLinks) {
      await this.crawlerQueue.add(runCrawler.commands, {
        crawlerLinkId: crawlerLink.id,
        userIds: [userId],
      });
    }

    return crawlerLinks;
  }

  async queueHandle(
    jobName = 'crawlerYoutubeNormal', //
    data,
  ) {
    await this[jobName](data);
  }

  async crawlerYoutubeShortAuto({ crawlerLinkId, userIds }) {
    console.log('crawlerYoutubeShortAuto');
    const crawlerLink = await this.crawlerLinkService.findOne(crawlerLinkId);
    try {
      crawlerLink.status = CrawlerLinkStatusEnum.Processing;
      await this.crawlerLinkService.updateEntity(crawlerLink);
      await this.youtubeService.init();
      await this.youtubeService.youtube.login.goto();
      await this.youtubeService.youtube.login.gotoShort();
      let article;
      for (let i = 0; i < 100; i++) {
        try {
          await delay(15);
          const dataShort = await this.youtubeService.youtube.short.getLink({
            offset: i,
          });
          console.log(dataShort);
          if (await this.crawler.exist({ where: { links: dataShort.href } })) {
            console.log(`${dataShort.href} is existed .`);
            continue;
          }
          crawlerLink.target = dataShort.href;
          try {
            article = await this.crawlerExcute(crawlerLink, userIds);
            crawlerLink.name = article.title;
            crawlerLink.thumbnail = article.thumbnail;
            crawlerLink.status = CrawlerLinkStatusEnum.Success;
          } catch (error) {
            console.log('Warning : Ignore error ' + error.message);
          }
          await this.youtubeService.youtube.short.clickBtnDown();
        } catch (error) {
          console.log(error.message);
          crawlerLink.status = CrawlerLinkStatusEnum.Error;
          crawlerLink.message = error.message;
          break;
        }
      }
    } catch (error) {
      crawlerLink.status = CrawlerLinkStatusEnum.Error;
      crawlerLink.message = error.message;
    }
    await this.crawlerLinkService.updateEntity(crawlerLink);
    await this.youtubeService.close();
    return 1;
  }

  async crawlerYoutubeNormal({ crawlerLinkId, userIds }) {
    console.log('crawlerYoutubeNormal');
    const crawlerLink = await this.crawlerLinkService.findOne(crawlerLinkId);
    try {
      crawlerLink.status = CrawlerLinkStatusEnum.Processing;
      await this.crawlerLinkService.updateEntity(crawlerLink);
      const article = await this.crawlerExcute(crawlerLink, userIds);
      crawlerLink.name = article.title;
      crawlerLink.thumbnail = article.thumbnail;
      crawlerLink.status = CrawlerLinkStatusEnum.Success;
      await this.crawlerLinkService.updateEntity(crawlerLink);
    } catch (error) {
      crawlerLink.status = CrawlerLinkStatusEnum.Error;
      crawlerLink.message = error.message;
      await this.crawlerLinkService.updateEntity(crawlerLink);
      throw new Error(error.message);
    }

    return 1;
  }

  async crawlerExcute(crawlerLink: CrawlerLink, userIds) {
    const file = await this.youtubeDlService.downloadFile(crawlerLink.target, {
      quality: crawlerLink.quality,
      typeFile: crawlerLink.typeFile,
    });
    const createCrawler: CreateCrawlerDto = {
      name: file.title,
      userId: crawlerLink.userId,
      tags: JSON.stringify(file.tags),
      description: file.description,
      size: file.size,
      linkDownloaded: file.linkDownloaded,
      links: crawlerLink.target,
      // meta: JSON.stringify(file.source),
      socialTargetIds: crawlerLink.socialTargets.map((i) => i.id),
      thumbnail: file.thumbnail,
    };

    await this.create(createCrawler, crawlerLink.userId);
    const createArticle: CreateArticleDto = {
      title: file.title,
      tags: JSON.stringify(file.tags),
      description: file.description,
      status: ArticleStatusEnum.PENDING,
      thumbnail: file.thumbnail,
      socialTargetIds: crawlerLink.socialTargets.map((i) => i.id),
      createLinks: [
        {
          url: crawlerLink.target,
          urlLocal: file.linkDownloaded,
          typeLink: LinkEnum.VIDEO,
          size: file.size,
          thumbnail: file.thumbnail,
        },
      ],
    };
    const article = await this.articleService.create(
      createArticle,
      crawlerLink.userId,
    );
    await this.puppeteerService.posArticle(
      { articleIds: [article.id] },
      userIds,
    );
    return article;
  }
}
