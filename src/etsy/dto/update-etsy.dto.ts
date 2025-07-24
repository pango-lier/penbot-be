import { PartialType } from '@nestjs/swagger';
import { CreateEtsyDto } from './create-etsy.dto';

export class UpdateEtsyDto extends PartialType(CreateEtsyDto) {}
