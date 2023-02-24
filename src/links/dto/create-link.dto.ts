import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { LinkEnum } from '../entities/link.enum';

export class CreateLinkDto {
  id?: number;

  @IsString()
  url: string;

  @IsString()
  urlLocal?: string;

  typeLink?: LinkEnum;

  size?: number;

  description?: string;

  @IsString()
  thumbnail?: string;

  @Type(() => Date)
  deletedAt?: Date;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;
}
