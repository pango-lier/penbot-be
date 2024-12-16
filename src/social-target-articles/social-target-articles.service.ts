import { Injectable } from '@nestjs/common';
import { CreateSocialTargetArticleDto } from './dto/create-social-target-article.dto';
import { UpdateSocialTargetArticleDto } from './dto/update-social-target-article.dto';

@Injectable()
export class SocialTargetArticlesService {
  create(createSocialTargetArticleDto: CreateSocialTargetArticleDto) {
    return 'This action adds a new socialTargetArticle';
  }

  findAll() {
    return `This action returns all socialTargetArticles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialTargetArticle`;
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
