import { Injectable } from '@nestjs/common';
import { CreateCrawlerLinkDto } from './dto/create-crawler-link.dto';
import { UpdateCrawlerLinkDto } from './dto/update-crawler-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlerLink } from './entities/crawler-link.entity';
import { Repository } from 'typeorm';
import { IPaginate } from 'src/paginate/interface/paginate.interface';
import { PaginateService } from 'src/paginate/paginate.service';

@Injectable()
export class CrawlerLinksService {
  constructor(
    @InjectRepository(CrawlerLink)
    private readonly crawlerLink: Repository<CrawlerLink>,
    private readonly paginateService: PaginateService,
  ) {}
  create(createCrawlerLinkDto: CreateCrawlerLinkDto, userId: number) {
    const create = this.crawlerLink.create(createCrawlerLinkDto);
    create.userId = userId;
    return this.crawlerLink.save(create);
  }

  async findAll(paginate: IPaginate, userId: number) {
    const q = this.crawlerLink.createQueryBuilder('crawler-link');
    return await this.paginateService.queryFilter(q, paginate, [], {
      defaultTable: 'crawler-link',
      getQuery: 'getMany',
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} crawlerLink`;
  }

  async update(id: number, updateCrawlerLinkDto: UpdateCrawlerLinkDto) {
    const update = await this.crawlerLink.findOneBy({ id });
    update.name = updateCrawlerLinkDto.name;
    update.description = updateCrawlerLinkDto.description;
    update.type = updateCrawlerLinkDto.type;
    update.target = updateCrawlerLinkDto.target;
    return await this.crawlerLink.save(update);
  }

  remove(id: number, userId: number) {
    return this.crawlerLink.delete({ id, userId });
  }
}
