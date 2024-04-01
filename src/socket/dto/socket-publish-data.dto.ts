import { CreateNotificationDto } from '@notifications/dto/create-notification.dto';
import { NotificationActionEnum } from '@notifications/enums/notification-action.enum';

import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SocketPublishDataDto {
  @IsOptional()
  @ValidateNested()
  notification?: CreateNotificationDto;

  @IsOptional()
  @IsBoolean()
  saveNotification?: boolean;

  @IsNotEmpty()
  @IsString()
  channel: string;

  @IsOptional()
  @IsEnum(NotificationActionEnum)
  action?: NotificationActionEnum;

  @IsOptional()
  data?: any;
}
