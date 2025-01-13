import { PartialType } from '@nestjs/swagger';
import { CreatePublishSocialDto } from './create-publish-social.dto';

export class UpdatePublishSocialDto extends PartialType(
  CreatePublishSocialDto,
) {}
