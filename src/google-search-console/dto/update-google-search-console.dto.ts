import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleSearchConsoleDto } from './create-google-search-console.dto';

export class UpdateGoogleSearchConsoleDto extends PartialType(CreateGoogleSearchConsoleDto) {}
