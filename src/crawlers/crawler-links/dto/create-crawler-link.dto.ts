import {
  CrawlerLinkEnum,
  CrawlerLinkStatusEnum,
  QualityEnum,
  TypeFileEnum,
} from '../entities/crawler-link.enum';

export class CreateCrawlerLinkDto {
  name: string;

  description?: string;

  quality?: QualityEnum;

  typeFile?: TypeFileEnum;

  status?: CrawlerLinkStatusEnum;

  type?: CrawlerLinkEnum;

  target: string;

  socialId?: number | string;

  accountId?: number | string;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;

  crawlerConfigs: Array<any>;
}
