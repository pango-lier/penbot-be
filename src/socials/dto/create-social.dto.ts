import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SocialEnum } from '../entities/social.enum';

export class CreateSocialDto {
  @IsOptional()
  active?: boolean;

  @IsOptional()
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

  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date;

  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;
}
