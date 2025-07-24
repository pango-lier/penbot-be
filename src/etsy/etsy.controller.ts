import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EtsyService } from './etsy.service';
import { CreateEtsyDto } from './dto/create-etsy.dto';
import { UpdateEtsyDto } from './dto/update-etsy.dto';

@Controller('etsy')
export class EtsyController {
  constructor(private readonly etsyService: EtsyService) {}

  @Post()
  create(@Body() createEtsyDto: CreateEtsyDto) {
    return this.etsyService.create(createEtsyDto);
  }

  @Get()
  findAll() {
    return this.etsyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etsyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtsyDto: UpdateEtsyDto) {
    return this.etsyService.update(+id, updateEtsyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etsyService.remove(+id);
  }
}
