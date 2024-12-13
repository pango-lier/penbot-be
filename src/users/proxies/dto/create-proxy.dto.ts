import { Type } from 'class-transformer';
import {
  IsBoolean,
  isEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProxyType } from '../entities/proxy.entity';

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

  @IsNotEmpty()
  @IsString()
  proxyType?: ProxyType;

  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  country_code: string;

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
