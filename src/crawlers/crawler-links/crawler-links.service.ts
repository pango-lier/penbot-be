import { Injectable } from '@nestjs/common';
import { CreateCrawlerLinkDto } from './dto/create-crawler-link.dto';
import { UpdateCrawlerLinkDto } from './dto/update-crawler-link.dto';

@Injectable()
export class CrawlerLinksService {
  create(createCrawlerLinkDto: CreateCrawlerLinkDto) {
    return 'This action adds a new crawlerLink';
  }

  findAll() {
    return `This action returns all crawlerLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crawlerLink`;
  }

  update(id: number, updateCrawlerLinkDto: UpdateCrawlerLinkDto) {
    return `This action updates a #${id} crawlerLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} crawlerLink`;
  }
}
