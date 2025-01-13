import { PartialType } from '@nestjs/mapped-types';
import { SocialTargetArticle } from '@social-target-articles/entities/social-target-article.entity';

export class CreateSocialTargetArticleDto extends PartialType(
  SocialTargetArticle,
) {}
