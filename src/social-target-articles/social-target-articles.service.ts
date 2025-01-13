import { Injectable } from '@nestjs/common';
import { CreateSocialTargetArticleDto } from './dto/create-social-target-article.dto';
import { UpdateSocialTargetArticleDto } from './dto/update-social-target-article.dto';
import { Article } from '@articles/entities/article.entity';
import { SocialTarget } from '@social-targets/entities/social-target.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialTargetArticle } from './entities/social-target-article.entity';
import { SocialTargetArticleStatusEnum } from './entities/social-target-article.enum';

@Injectable()
export class SocialTargetArticlesService {
  constructor(
    @InjectRepository(SocialTargetArticle)
    private readonly socialTargetArticle: Repository<SocialTargetArticle>,
  ) {}

  async create(createSocialTargetArticleDto: CreateSocialTargetArticleDto) {
    const create = this.socialTargetArticle.create(
      createSocialTargetArticleDto,
    );
    return await this.socialTargetArticle.save(create);
  }

  findAll() {
    return `This action returns all socialTargetArticles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialTargetArticle`;
  }

  async startArticle(socialTarget: SocialTarget, article: Article) {
    const socialTargetArticle = await this.socialTargetArticle.findOne({
      where: { articleId: article.id, socialTargetId: socialTarget.id },
    });
    if (!socialTargetArticle) {
      return await this.create({
        articleId: article.id,
        socialTargetId: socialTarget.id,
        status: SocialTargetArticleStatusEnum.Processing,
      });
    }
    if (
      [
        SocialTargetArticleStatusEnum.Processing,
        SocialTargetArticleStatusEnum.Pending,
      ].includes(socialTargetArticle.status)
    ) {
    }
    return socialTargetArticle;
  }

  async endArticle(
    socialTargetArticle: SocialTargetArticle,
    updateDto: UpdateSocialTargetArticleDto,
  ) {
    const merge = this.socialTargetArticle.merge(
      socialTargetArticle,
      updateDto,
    );
    return this.socialTargetArticle.save(merge);
  }

  update(
    id: number,
    updateSocialTargetArticleDto: UpdateSocialTargetArticleDto,
  ) {
    return `This action updates a #${id} socialTargetArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialTargetArticle`;
  }
}
