import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SocialEnum } from '../entities/social.enum';

export class CreateSocialDto {

  @IsOptional()
  active?: boolean;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsOptional()
  socialType?: SocialEnum;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @Type(() => Date)
  deletedAt?: Date;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;
}
