import { IsString } from 'class-validator';
import { ArticleStatusEnum } from '../entities/article-status.enum';
import { Type } from 'class-transformer';

export class CreateArticleDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  content: string;

  status?: ArticleStatusEnum;

  active?: boolean;

  @Type(() => Date)
  deletedAt?: Date;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;
}
