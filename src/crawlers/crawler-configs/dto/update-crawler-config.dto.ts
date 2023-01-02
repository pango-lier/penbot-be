import { PartialType } from '@nestjs/mapped-types';
import { CreateCrawlerConfigDto } from './create-crawler-config.dto';

export class UpdateCrawlerConfigDto extends PartialType(CreateCrawlerConfigDto) {}
