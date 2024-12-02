import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinterestService } from './pinterest.service';
import { CreatePinterestDto } from './dto/create-pinterest.dto';
import { UpdatePinterestDto } from './dto/update-pinterest.dto';

@Controller('pinterest')
export class PinterestController {
  constructor(private readonly pinterestService: PinterestService) {}

  @Post()
  create(@Body() createPinterestDto: CreatePinterestDto) {
    return this.pinterestService.create(createPinterestDto);
  }

  @Get()
  findAll() {
    return this.pinterestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pinterestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePinterestDto: UpdatePinterestDto) {
    return this.pinterestService.update(+id, updatePinterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pinterestService.remove(+id);
  }
}
