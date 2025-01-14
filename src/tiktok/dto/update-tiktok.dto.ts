import { PartialType } from '@nestjs/swagger';
import { CreateTiktokDto } from './create-tiktok.dto';

export class UpdateTiktokDto extends PartialType(CreateTiktokDto) {}
