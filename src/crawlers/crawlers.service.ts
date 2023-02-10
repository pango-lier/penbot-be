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

@Injectable()
export class CrawlersService {
  constructor(
    @InjectRepository(Crawler) private readonly crawler: Repository<Crawler>,
    @InjectRepository(SocialTarget)
    private readonly social: Repository<SocialTarget>,
    private readonly crawlerLinkService: CrawlerLinksService,
    @InjectQueue('crawler') private readonly crawlerQueue: Queue,
    @InjectQueue('write-log') private readonly writeLogQueue: Queue,
    private readonly paginateService: PaginateService,
    private readonly youtubeDlService: YoutubeDlService,
    private readonly puppeteerService: PuppeteersService,
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
    return `This action removes a #${id} crawler`;
  }

  async runQueueCrawler(runCrawler: RunCrawlerQueueDto, userId: number) {
    const crawlerLinks = await this.crawlerLinkService.findArray(
      runCrawler.id,
      userId,
    );
    // await this.crawlerVideoYoutubeLinkDirect(
    //   crawlerLinks[0],
    //   runCrawler.options,
    // );
    await crawlerLinks.forEach(async (crawlerLink) => {
      if (crawlerLink.type)
        this.crawlerQueue.add(crawlerLink.type, {
          crawlerLink,
          options: runCrawler.options,
          userIds: [userId],
        });
    });

    return true;
  }

  async crawlerVideoYoutubeLinkDirect(
    crawlerLink: CrawlerLink,
    options?: any,
    userIds = [],
  ) {
    try {
      crawlerLink.status = CrawlerLinkStatusEnum.Processing;
      crawlerLink = await this.crawlerLinkService.updateEntity(crawlerLink);
      const file = await this.youtubeDlService.downloadFile(
        crawlerLink.target,
        { quality: crawlerLink.quality, typeFile: crawlerLink.typeFile },
      );
      const createCrawler: CreateCrawlerDto = {
        name: file.title,
        userId: crawlerLink.userId,
        tags: JSON.stringify(file.tags),
        description: file.description,
        size: file.size,
        linkDownloaded: file.linkDownloaded,
        links: crawlerLink.target,
        meta: JSON.stringify(file.source),
        socialTargetIds: crawlerLink.socialTargets.map((i) => i.id),
      };

      const crawler = await this.create(createCrawler, crawlerLink.userId);
      await this.puppeteerService.posArticle(
        crawler,
        crawlerLink.socialTargets,
        userIds,
      );
      crawlerLink.status = CrawlerLinkStatusEnum.Success;
      crawlerLink = await this.crawlerLinkService.updateEntity(crawlerLink);
    } catch (error) {
      crawlerLink.status = CrawlerLinkStatusEnum.Error;
      crawlerLink.message = error.message;
      crawlerLink = await this.crawlerLinkService.updateEntity(crawlerLink);
      throw new Error(error.message);
    }

    return 1;
  }
}
