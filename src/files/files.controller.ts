import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateFileDto } from './dto/create-file.dto';
import { UpdateLinkDto } from './dto/update-file.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly linksService: FilesService) {}

  @Post()
  create(@Body() createLinkDto: CreateFileDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
