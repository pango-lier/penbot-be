import { PartialType } from '@nestjs/swagger';
import { CreateXDto } from './create-x.dto';

export class UpdateXDto extends PartialType(CreateXDto) {}
