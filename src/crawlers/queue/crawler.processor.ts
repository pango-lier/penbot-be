import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { CrawlerLinkEnum } from 'src/crawlers/crawler-links/entities/crawler-link.enum';
import { CrawlersService } from '../crawlers.service';

@Processor('crawler', {})
export class CrawlerProcessor extends WorkerHost {
  private readonly logger = new Logger(CrawlerProcessor.name);
  constructor(private readonly crawlerService: CrawlersService) {
    super();
  }

  @OnWorkerEvent('active')
  OnWorkerEvent(job: Job) {
    console.log(
      `OnWorkerEvent  ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  async process(job: Job<any, any, string>, token?: string) {
    switch (job.name) {
      case CrawlerLinkEnum.YoutubeShort:
        break;
      case CrawlerLinkEnum.YoutubeVideoDirect:
        await this.crawlerService.crawlerVideoYoutubeLinkDirect(
          job.data.crawlerLink,
          job.data.options,
        );
        break;
    }
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}... ${token}`,
    );
  }
}
