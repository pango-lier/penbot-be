import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { SocialEnum } from '../entities/social.enum';

export class CreateSocialDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  username?: string;
  @IsString()
  password?: string;

  socialType?: SocialEnum;

  @Type(() => Date)
  deletedAt?: Date;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;
}
