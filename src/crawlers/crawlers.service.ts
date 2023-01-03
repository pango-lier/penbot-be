import { Injectable } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/paginate/paginate.service';
import { IPaginate } from 'src/paginate/interface/paginate.interface';

@Injectable()
export class CrawlersService {
  constructor(
    @InjectRepository(Crawler) private readonly crawler: Repository<Crawler>,
    private readonly paginateService: PaginateService,
  ) {}

  create(createCrawlerDto: CreateCrawlerDto, userId: number) {
    const create = this.crawler.create(createCrawlerDto);
    create.userId = userId;
    return this.crawler.save(create);
  }

  findAll(paginate: IPaginate, userId: number) {
    const query = this.crawler.createQueryBuilder('crawler');
    return this.paginateService.queryFilter(query, paginate, [], {
      getQuery: 'getMany',
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} crawler`;
  }

  async update(id: number, updateCrawlerDto: UpdateCrawlerDto) {
    const update = await this.crawler.findOneBy({ id });
    update.description = updateCrawlerDto.description;
    update.meta = updateCrawlerDto.meta;
    update.name = updateCrawlerDto.name;
    update.tags = updateCrawlerDto.tags;
    update.type = updateCrawlerDto.type;
    update.linkDownloaded = updateCrawlerDto.linkDownloaded;
    update.links = updateCrawlerDto.links;
    return this.crawler.save(update);
  }

  remove(id: number) {
    return `This action removes a #${id} crawler`;
  }
}
