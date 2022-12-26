import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsString()
  proxyId?: string;

  @IsString()
  proxyType?: string;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  expiresAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;

  @Type(() => Date)
  deletedAt?: Date;

  @IsInt()
  groupId?: number;

  @IsInt()
  userId?: number;
}
