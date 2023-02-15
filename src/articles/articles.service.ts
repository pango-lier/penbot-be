import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Repository } from 'typeorm';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PaginateService } from '@paginate/paginate.service';
import { LinksService } from '../links/links.service';
import { Link } from '../links/entities/link.entity';
import { SocialTarget } from '../social-targets/entities/social-target.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
    private readonly paginateService: PaginateService,
    private readonly linkService: LinksService,
    @InjectRepository(SocialTarget)
    private readonly socialTarget: Repository<SocialTarget>,
  ) {}
  async create(createArticleDto: CreateArticleDto, userId?: number) {
    const createArticle = this.article.create(createArticleDto);
    if (createArticleDto.createLinks) {
      const links: Link[] = [];
      for (const link of createArticleDto.createLinks) {
        links.push(await this.linkService.create(link));
      }
      createArticle.links = links;
    }
    createArticle.socialTargets = await this.socialTarget.findBy({
      id: In(createArticleDto.socialTargetIds),
    });
    createArticle.userId = userId;
    return await this.article.save(createArticle);
  }

  async findAll(paginate: IPaginate) {
    const q = this.article.createQueryBuilder('article');
    return await this.paginateService.queryFilter(q, paginate, [], {
      defaultTable: 'article',
      getQuery: 'getMany',
    });
  }

  async findOne(id: number) {
    return await this.article.findOne({
      where: { id },
      relations: {
        socialTargets: {
          social: true,
        },
        links: true,
      },
    });
  }

  async findIds(ids: number[]) {
    return await this.article.find({
      where: { id: In(ids) },
      relations: {
        socialTargets: {
          social: true,
        },
        links: true,
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
