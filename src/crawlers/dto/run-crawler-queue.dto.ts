import { CreateCrawlerLinkDto } from '../crawler-links/dto/create-crawler-link.dto';

export class RunCrawlerQueueDto {
  crawlerLinks?: CreateCrawlerLinkDto[];
  commands: 'crawlerYoutubeFromUrl' | 'crawlerYoutubeAuto';
  crawlerLinkIds?: number[];
}
