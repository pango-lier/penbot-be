import { CrawlerLinkEnum } from '../entities/crawler-link.enum';

export class CreateCrawlerLinkDto {
  name: string;

  description?: string;

  status?: string;

  type?: CrawlerLinkEnum;

  target: string;

  socialId?: number | string;

  accountId?: number | string;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;

  crawlerConfigs: Array<any>;
}
