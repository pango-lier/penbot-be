
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { SocketPublishDataDto } from './socket-publish-data.dto';
import { User } from '@users/entities/user.entity';

export class SocketPrivateDataDto extends SocketPublishDataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  receivers: User[];
}
