import { PartialType } from '@nestjs/swagger';
import { CreateSocialTargetArticleDto } from './create-social-target-article.dto';

export class UpdateSocialTargetArticleDto extends PartialType(CreateSocialTargetArticleDto) {}
