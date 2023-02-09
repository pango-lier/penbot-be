import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialTargetDto } from './create-social-target.dto';

export class UpdateSocialTargetDto extends PartialType(CreateSocialTargetDto) {}
