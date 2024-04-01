import { NotificationActionEnum } from '@notifications/enums/notification-action.enum';
import { NotificationStatusEnum } from '@notifications/enums/notification-status.enum';
import NotificationTagEnum from '@notifications/enums/notification-tag.enum';
import { User } from '@users/entities/user.entity';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateNotificationDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => User)
  sender?: User;

  @IsOptional()
  @IsObject()
  data?: any;

  @IsOptional()
  @IsString()
  message?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  notifiableType?: string;

  @IsNotEmpty()
  @IsNumberString()
  notifiableId?: number;

  @IsOptional()
  @IsEnum(NotificationStatusEnum)
  status?: NotificationStatusEnum;

  @IsNotEmpty()
  @IsString()
  channel?: string;

  @IsOptional()
  @IsEnum(NotificationActionEnum)
  action?: NotificationActionEnum;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => User)
  receivers?: User[];

  @IsOptional()
  @IsDateString()
  readAt?: Date;
}
