import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { IPaginate } from '@paginate/interface/paginate.interface';
import { PaginateService } from '@paginate/paginate.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
    private readonly paginateService: PaginateService,
  ) {}
  create(createArticleDto: CreateArticleDto) {
    const createArticle = this.article.create(createArticleDto);

    return this.article.save(createArticle);
  }

  async findAll(paginate: IPaginate) {
    const q = this.article.createQueryBuilder('article');
    return await this.paginateService.queryFilter(q, paginate, [], {
      defaultTable: 'article',
      getQuery: 'getMany',
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
