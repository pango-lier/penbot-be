import { Injectable } from '@nestjs/common';
import { CreateCrawlerLinkDto } from './dto/create-crawler-link.dto';
import { UpdateCrawlerLinkDto } from './dto/update-crawler-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlerLink } from './entities/crawler-link.entity';
import { In, Raw, Repository } from 'typeorm';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PaginateService } from '@paginate/paginate.service';
import { SocialTarget } from '../../social-targets/entities/social-target.entity';

@Injectable()
export class CrawlerLinksService {
  constructor(
    @InjectRepository(CrawlerLink)
    private readonly crawlerLink: Repository<CrawlerLink>,
    @InjectRepository(SocialTarget)
    private readonly socialTarget: Repository<SocialTarget>,

    private readonly paginateService: PaginateService,
  ) {}
  async create(createCrawlerLinkDto: CreateCrawlerLinkDto, userId: number) {
    const create = this.crawlerLink.create(createCrawlerLinkDto);
    create.userId = userId;
    create.socialTargets = await this.socialTarget.findBy({
      id: In(createCrawlerLinkDto.socialTargetIds),
    });
    return this.crawlerLink.save(create);
  }

  async findAll(paginate: IPaginate, userId: number) {
    const q = this.crawlerLink.createQueryBuilder('crawler_link');
    q.where('crawler_link.userId = :userId', { userId });
    q.leftJoinAndSelect('crawler_link.socialTargets', 'socialTargets');
    return await this.paginateService.queryFilter(q, paginate, [], {
      defaultTable: 'crawler_link',
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
    update.socialTargets = await this.socialTarget.findBy({
      id: In(updateCrawlerLinkDto.socialTargetIds),
    });
    return await this.crawlerLink.save(update);
  }

  remove(id: number, userId: number) {
    return this.crawlerLink.delete({ id, userId });
  }

  async findArray(id: Array<number | string>, userId: number) {
    return await this.crawlerLink.find({
      where: {
        id: Raw((alias) => `${alias} IN (:...id)`, {
          id,
        }),
        userId,
      },
      relations: {
        socialTargets: true,
      },
    });
  }

  async updateEntity(crawlerLink: CrawlerLink) {
    return await this.crawlerLink.save(crawlerLink);
  }
}
