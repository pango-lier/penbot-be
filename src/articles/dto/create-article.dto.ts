import { IsString } from 'class-validator';
import { ArticleStatusEnum } from '../entities/article-status.enum';
import { Type } from 'class-transformer';
import { CreateFileDto } from '../../files/dto/create-file.dto';

export class CreateArticleDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  url?: string;

  tags: string;

  status?: ArticleStatusEnum;

  active?: boolean;

  thumbnail?: string;

  @Type(() => Date)
  deletedAt?: Date;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;

  socialTargetIds?: number[];

  createLinks?: CreateFileDto[];
}
