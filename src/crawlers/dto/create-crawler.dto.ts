import { CrawlerStatusEnum } from '../enum/crawler-link.enum';

export class CreateCrawlerDto {
  name: string;

  type?: string;

  status?: CrawlerStatusEnum;

  meta?: string;

  tags?: string;

  description?: string;

  links?: string;

  linkDownloaded?: string;

  crawlerLinkId?: number;

  size?: number;

  userId?: number;
}
