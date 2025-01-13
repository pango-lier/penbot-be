import { Injectable } from '@nestjs/common';
import { CreatePublishSocialDto } from './dto/create-publish-social.dto';
import { UpdatePublishSocialDto } from './dto/update-publish-social.dto';
import { PuppeteersService } from '@puppeteers/puppeteers.service';
import { ArticlesService } from '@articles/articles.service';
import { SocialTargetArticle } from '@social-target-articles/entities/social-target-article.entity';
import { SocialTargetArticlesService } from '@social-target-articles/social-target-articles.service';

@Injectable()
export class PublishSocialsService {
  constructor(
    private readonly socialTargetArticle: SocialTargetArticlesService,
    private readonly articleService: ArticlesService,
    private readonly puppeteerService: PuppeteersService,
  ) {}

  async create(createPublishSocialDto: CreatePublishSocialDto, userId: any) {
    return await this.puppeteerService.posArticle(
      createPublishSocialDto.articles,
      createPublishSocialDto.socialTargets,
      userId,
    );
  }

  findAll() {
    return `This action returns all publishSocials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publishSocial`;
  }

  update(id: number, updatePublishSocialDto: UpdatePublishSocialDto) {
    return `This action updates a #${id} publishSocial`;
  }

  remove(id: number) {
    return `This action removes a #${id} publishSocial`;
  }
}
