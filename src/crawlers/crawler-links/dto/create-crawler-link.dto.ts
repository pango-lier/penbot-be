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

  @IsOptional()
  description?: string;

  quality?: QualityEnum;

  typeFile?: TypeFileEnum;

  status?: CrawlerLinkStatusEnum;

  type?: CrawlerLinkEnum;

  target: string;

  socialIds?: number[];

  accountId?: number | string;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;

  crawlerConfigs: Array<any>;
}
