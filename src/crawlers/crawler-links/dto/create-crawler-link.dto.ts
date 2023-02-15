import { IsOptional } from 'class-validator';
import {
  CrawlerLinkEnum,
  CrawlerLinkStatusEnum,
  QualityEnum,
  TypeFileEnum,
} from '../entities/crawler-link.enum';

export class CreateCrawlerLinkDto {
  @IsOptional()
  name?: string;

  quality?: QualityEnum;

  typeFile?: TypeFileEnum;

  status?: CrawlerLinkStatusEnum;

  type?: CrawlerLinkEnum;

  target: string;

  @IsOptional()
  limitCrawl?: number;

  @IsOptional()
  countCrawl?: number;

  socialTargetIds?: number[];

  proxyId?: number | string;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;

  crawlerConfigs: Array<any>;
}
