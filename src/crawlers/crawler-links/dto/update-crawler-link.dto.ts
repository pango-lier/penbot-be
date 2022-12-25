import { PartialType } from '@nestjs/mapped-types';
import { CreateCrawlerLinkDto } from './create-crawler-link.dto';

export class UpdateCrawlerLinkDto extends PartialType(CreateCrawlerLinkDto) {}
