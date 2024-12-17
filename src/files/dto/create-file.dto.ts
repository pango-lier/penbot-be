
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateFileDto {
  id?: number;

  @IsString()
  url: string;

  @IsString()
  urlLocal?: string;

  @IsString()
  type?: string;

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
