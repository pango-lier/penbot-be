import { PartialType } from '@nestjs/mapped-types';
import { CreatePuppeteerDto } from './create-puppeteer.dto';

export class UpdatePuppeteerDto extends PartialType(CreatePuppeteerDto) {}
