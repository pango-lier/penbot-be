import { CrawlerLinkEnum } from "@crawlers/crawler-links/entities/crawler-link.enum";

export class RunCrawlerQueueDto {
  commands?: CrawlerLinkEnum;
  crawler?: {
    type?: CrawlerLinkEnum,
    target?: string,
    [key: string]: string | number,
  }
}
