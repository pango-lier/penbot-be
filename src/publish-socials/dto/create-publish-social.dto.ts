import { Article } from '@articles/entities/article.entity';
import { SocialTarget } from '@social-targets/entities/social-target.entity';

export class CreatePublishSocialDto {
  articles?: Article[];
  socialTargets?: SocialTarget[];
}
