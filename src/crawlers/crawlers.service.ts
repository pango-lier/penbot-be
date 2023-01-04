import { Injectable } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/paginate/paginate.service';
import { IPaginate } from 'src/paginate/interface/paginate.interface';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RunCrawlerQueueDto } from './dto/run-crawler-queue.dto';
import { CrawlerLinksService } from './crawler-links/crawler-links.service';
import { CrawlerLink } from './crawler-links/entities/crawler-link.entity';
import { CrawlerLinkStatusEnum } from './crawler-links/entities/crawler-link.enum';
import { YoutubeDlService } from './youtube-dl/youtube-dl.service';

@Injectable()
export class CrawlersService {
  constructor(
    @InjectRepository(Crawler) private readonly crawler: Repository<Crawler>,
    private readonly crawlerLinkService: CrawlerLinksService,
    @InjectQueue('crawler') private readonly crawlerQueue: Queue,
    @InjectQueue('write-log') private readonly writeLogQueue: Queue,
    private readonly paginateService: PaginateService,
    private readonly youtubeDlService: YoutubeDlService,
  ) {}

  create(createCrawlerDto: CreateCrawlerDto, userId: number) {
    const create = this.crawler.create(createCrawlerDto);
    create.userId = userId;
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
    crawlerLinks.forEach((crawlerLink) => {
      if (crawlerLink.type)
        this.crawlerQueue.add(crawlerLink.type, {
          crawlerLink,
          options: runCrawler.options,
        });
    });

    return true;
  }

  async crawlerVideoYoutubeLinkDirect(crawlerLink: CrawlerLink, options?: any) {
    try {
      crawlerLink.status = CrawlerLinkStatusEnum.Processing;
      crawlerLink = await this.crawlerLinkService.updateEntity(crawlerLink);
      const file = await this.youtubeDlService.downloadFile(crawlerLink.target);
      const createCrawler: CreateCrawlerDto = {
        name: 'download file',
        userId: crawlerLink.userId,
        tags: file.tags,
        description: file.description,
        size: file.size,
        linkDownloaded: file.linkDownloaded,
        links: crawlerLink.target,
      };
      await this.create(createCrawler, crawlerLink.userId);
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
