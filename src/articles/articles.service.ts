import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Repository } from 'typeorm';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PaginateService } from '@paginate/paginate.service';
import { FilesService } from '../files/files.service';
import { SocialTarget } from '../social-targets/entities/social-target.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
    private readonly paginateService: PaginateService,
    private readonly linkService: FilesService,
    @InjectRepository(SocialTarget)
    private readonly socialTarget: Repository<SocialTarget>,
  ) {}
  async create(createArticleDto: CreateArticleDto, userId?: number) {
    const createArticle = this.article.create(createArticleDto);
    createArticle.userId = userId;
    return await this.article.save(createArticle);
  }

  async findAll(paginate: IPaginate, userId: number) {
    const q = this.article.createQueryBuilder('article');
    q.leftJoinAndSelect('article.files', 'files');
    q.leftJoinAndSelect('article.socialTargetArticles', 'socialTargetArticles');
    q.where('userId = :id', { id: userId });
    return await this.paginateService.queryFilter(
      q,
      paginate,
      ['title', 'id', 'url'],
      {
        defaultTable: 'article',
        getQuery: 'getMany',
      },
    );
  }

  async findOne(id: number) {
    return await this.article.findOne({
      where: { id },
      relations: {
        socialTargetArticles: {
          socialTarget: { social: true },
        },
        files: true,
      },
    });
  }

  async findIds(ids: number[]) {
    return await this.article.find({
      where: { id: In(ids) },
      relations: {
        socialTargetArticles: {
          socialTarget: { social: true },
        },
        files: true,
      },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const ar = await this.article.findOne({ where: { id } });
    const merge = this.article.merge(ar, updateArticleDto);
    return await this.article.save(merge);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
