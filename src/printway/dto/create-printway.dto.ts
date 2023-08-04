import { OmitType } from '@nestjs/mapped-types';
import { Printway } from '@printway/entities/printway.entity';

export class CreatePrintwayDto extends OmitType(Printway, [
  'createdAt',
  'id',
  'updatedAt',
]) {}
