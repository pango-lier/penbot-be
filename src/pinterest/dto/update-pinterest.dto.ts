import { PartialType } from '@nestjs/swagger';
import { CreatePinterestDto } from './create-pinterest.dto';

export class UpdatePinterestDto extends PartialType(CreatePinterestDto) {}
