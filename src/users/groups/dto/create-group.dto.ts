import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { GroupEnum } from '../entities/group.enum';

export class CreateGroupDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  groupType: GroupEnum;

  @IsString()
  secretName?: string;

  @IsString()
  secretKey?: string;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;

  @Type(() => Date)
  deletedAt?: Date;

  @IsInt()
  userId?: number;
}
