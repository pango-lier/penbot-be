import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XService } from './x.service';
import { CreateXDto } from './dto/create-x.dto';
import { UpdateXDto } from './dto/update-x.dto';

@Controller('x')
export class XController {
  constructor(private readonly xService: XService) {}

  @Post()
  create(@Body() createXDto: CreateXDto) {
    return this.xService.create(createXDto);
  }

  @Get()
  findAll() {
    return this.xService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXDto: UpdateXDto) {
    return this.xService.update(+id, updateXDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xService.remove(+id);
  }
}
