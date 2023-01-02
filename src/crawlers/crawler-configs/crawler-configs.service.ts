import { Injectable } from '@nestjs/common';
import { CreateCrawlerConfigDto } from './dto/create-crawler-config.dto';
import { UpdateCrawlerConfigDto } from './dto/update-crawler-config.dto';

@Injectable()
export class CrawlerConfigsService {
  create(createCrawlerConfigDto: CreateCrawlerConfigDto) {
    return 'This action adds a new crawlerConfig';
  }

  findAll() {
    return `This action returns all crawlerConfigs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crawlerConfig`;
  }

  update(id: number, updateCrawlerConfigDto: UpdateCrawlerConfigDto) {
    return `This action updates a #${id} crawlerConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} crawlerConfig`;
  }
}
