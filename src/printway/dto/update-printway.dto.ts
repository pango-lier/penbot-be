import { PartialType } from '@nestjs/mapped-types';
import { CreatePrintwayDto } from './create-printway.dto';

export class UpdatePrintwayDto extends PartialType(CreatePrintwayDto) {}
