import { PartialType } from '@nestjs/swagger';
import { CreateInstagramDto } from './create-instagram.dto';

export class UpdateInstagramDto extends PartialType(CreateInstagramDto) {}
