import { Injectable } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';

@Injectable()
export class CrawlersService {
  create(createCrawlerDto: CreateCrawlerDto) {
    return 'This action adds a new crawler';
  }

  findAll() {
    return `This action returns all crawlers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crawler`;
  }

  update(id: number, updateCrawlerDto: UpdateCrawlerDto) {
    return `This action updates a #${id} crawler`;
  }

  remove(id: number) {
    return `This action removes a #${id} crawler`;
  }
}
