import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProxyDto {
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

  @IsNumberString()
  groupId?: number;

  @IsOptional()
  @IsNumberString()
  userId?: number;
}
